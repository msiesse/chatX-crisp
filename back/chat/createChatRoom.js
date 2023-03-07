import {ChatRoom} from "./chatRoom.js";

export class CreateChatRoomUsecase {
    constructor(chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository
    }

    exec(name, user) {
        let chatRoom = this.chatRoomRepository.find({ name })
        if (!chatRoom) {
            chatRoom = new ChatRoom(name,[], {})
        }
        chatRoom.users[user.username] = user
        this.chatRoomRepository.save(chatRoom)
        return chatRoom
    }
}