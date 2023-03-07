import {InMemoryChatRoomRepository} from "../chatRoomRepository.js";

let chatRoomRepository = null

export const getChatRoomRepository = () => {
    if (chatRoomRepository) return chatRoomRepository
    chatRoomRepository = new InMemoryChatRoomRepository()
    return chatRoomRepository
}