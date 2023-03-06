export class InMemoryChatRoomRepository {
    constructor() {
        this.rooms = {}
    }

    find(options = {}) {
        return this.rooms[options.name]
    }

    save(chatRoom) {
        this.rooms[chatRoom.name] = chatRoom
    }
}
