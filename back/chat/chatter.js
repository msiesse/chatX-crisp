export class Chatter {
    constructor(username) {
        this.username = username
    }
}

export const createChatterFromToken = (decoded_token) => {
    return new Chatter(decoded_token.username)
}