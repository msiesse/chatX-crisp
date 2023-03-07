import {CreateChatRoomUsecase} from "./createChatRoom.js";
import {SendMessageUsecase} from "./sendMessage.js";
import {createChatterFromToken} from "./chatter.js";
import {io} from "../configApp.js";
import {getChatRoomRepository} from "./dependencies/chatRoomRepository.js";


const chatRoomRepository = getChatRoomRepository()

io.on('connection', (socket) => {
    const createChatRoomUsecase = new CreateChatRoomUsecase(chatRoomRepository)
    const sendMessageUsecase = new SendMessageUsecase(chatRoomRepository)

    function initChatRoom(roomName) {
        socket.join(roomName)
        const chatRoom = createChatRoomUsecase.exec(roomName, createChatterFromToken(socket.decoded_token))
        socket.emit('room-joined', {messages: chatRoom.messages, users: chatRoom.users})
    }

    socket.on('join-room', (roomName) => {
        initChatRoom(roomName);
        socket.broadcast.to(roomName).emit('user-connected', createChatterFromToken(socket.decoded_token));
    })

    socket.on('send-message', ({roomName, message}) => {
        sendMessageUsecase.exec(roomName, message)
        io.to(roomName).emit('new-message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export const ioChat = io