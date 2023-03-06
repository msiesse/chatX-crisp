import {ChatRoom} from "./chatRoom.js";

export class CreateChatRoomUsecase {
    constructor(chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository
    }

    exec(name) {
        let chatRoom = this.chatRoomRepository.find({ name })
        if (!chatRoom) {
            chatRoom = new ChatRoom(name,[])
            this.chatRoomRepository.save(chatRoom)
        }
        return chatRoom
    }
}