import {InMemoryUserRepository} from "../../authentication/userRepository.js";

let userRepository = null

export const getUserRepository = () => {
    if (userRepository) return userRepository
    userRepository = new InMemoryUserRepository()
    return userRepository
}