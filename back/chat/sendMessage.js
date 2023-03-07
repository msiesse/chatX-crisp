import {ChatRoomDontExistError} from "./errors/chatRoomDontExist.js";

export class SendMessageUsecase {
    constructor(chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository
    }

    exec(roomName, message) {
        const chatRoom = this.chatRoomRepository.find({name: roomName})
        if (!chatRoom) throw new ChatRoomDontExistError(`chatRoom ${roomName} doesn't exist, you can't send a message there`)
        chatRoom.messages.push(message)
        this.chatRoomRepository.save(chatRoom)
    }

}