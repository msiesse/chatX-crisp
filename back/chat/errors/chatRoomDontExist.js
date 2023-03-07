export class ChatRoomDontExistError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ChatRoomDontExistError';
    }
}
