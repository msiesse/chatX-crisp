import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {useSocketStore} from "./socket/useSocket.js";
import {useAuthStore} from "./useAuthStore.js";
import {useRoute} from "vue-router";

export const useChatRoomStore = defineStore('chatroom', () => {
    const socketStore = useSocketStore()
    const {username} = useAuthStore()
    const messages = ref([])
    const users = ref({})
    const {socketClient} = storeToRefs(socketStore)

    socketClient.value.on('new-message', (message) => {
        messages.value.push(message)
    })

    socketClient.value.on('room-joined', ({messages: m, users: u}) => {
        messages.value = m
        users.value = u
    })

    socketClient.value.on('user-connected', (user) => {
        users.value[user.username] = user
    })

    const sendMessage = (roomName, content) => {
        socketClient.value.emit('send-message', {
            roomName: roomName,
            message: {
                id: Date.now(),
                username,
                content
            },
        })
    }

    return {
        messages,
        users,
        sendMessage,
    }
})