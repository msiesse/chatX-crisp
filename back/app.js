import {Server} from "socket.io";
import {InMemoryChatRoomRepository} from "./chat/repositories/chatRoomRepository.js";
import {CreateChatRoomUsecase} from "./chat/createChatRoom.js";
import {SendMessageUsecase} from "./chat/sendMessage.js";

const io = new Server({
    cors: {
        origin: "*"
    }
});

const chatRoomRepository = new InMemoryChatRoomRepository()

io.on('connection', (socket) => {
    const createChatRoomUsecase = new CreateChatRoomUsecase(chatRoomRepository)
    const sendMessageUsecase = new SendMessageUsecase(chatRoomRepository)

    socket.on('create-room', (roomName) => {
        socket.join(roomName)
        const chatRoom = createChatRoomUsecase.exec(roomName)
        io.to(roomName).emit('new-messages', chatRoom.messages)
        console.log(`New room created: ${roomName}`);
    });

    socket.on('join-room', (roomName) => {
        socket.join(roomName)
        const chatRoom = createChatRoomUsecase.exec(roomName)
        io.to(roomName).emit('new-messages', chatRoom.messages)
        console.log(`Room Joined: ${roomName}`)
    })

    socket.on('send-message', ({roomName, message}) => {
        sendMessageUsecase.exec(roomName, message)
        io.to(roomName).emit('new-message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

io.listen(3000)