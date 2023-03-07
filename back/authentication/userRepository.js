import bcrypt from "bcrypt";

export class InMemoryUserRepository {
    constructor() {
        this.users = {}
    }

    save(user) {
        this.users[user.name] = user
    }

    find(options = {}) {
        if (this.users[options.name] && options.password) {
            return bcrypt.compareSync(options.password, this.users[options.name].hash) ? this.users[options.name] : null
        } else if (this.users[options.name]) {
            return this.users[options.name]
        }
        return null
    }
}