import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {Server} from "socket.io";
import {InMemoryChatRoomRepository} from "./chat/repositories/chatRoomRepository.js";
import {CreateChatRoomUsecase} from "./chat/createChatRoom.js";
import {SendMessageUsecase} from "./chat/sendMessage.js";
import cors from "cors";
import {routerAuthentication} from "./routes/authentication.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', routerAuthentication);

const chatRoomRepository = new InMemoryChatRoomRepository()

io.on('connection', (socket) => {
    const createChatRoomUsecase = new CreateChatRoomUsecase(chatRoomRepository)
    const sendMessageUsecase = new SendMessageUsecase(chatRoomRepository)

    function initChatRoom(roomName) {
        socket.join(roomName)
        const chatRoom = createChatRoomUsecase.exec(roomName, {id: socket.id})
        socket.emit('room-joined', chatRoom.messages, chatRoom.users)
    }

    socket.on('join-room', (roomName) => {
        initChatRoom(roomName);
        socket.broadcast.to(roomName).emit('user-connected', {id: socket.id});
    })

    socket.on('send-message', ({roomName, message}) => {
        sendMessageUsecase.exec(roomName, message)
        io.to(roomName).emit('new-message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(3000, () => {
    console.log('Server started on port 3000');
});