export class SendMessageUsecase {
    constructor(chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository
    }

    exec(roomName, message) {
        const chatRoom = this.chatRoomRepository.find({ name: roomName })
        chatRoom.messages.push(message)
        this.chatRoomRepository.save(chatRoom)
    }

}