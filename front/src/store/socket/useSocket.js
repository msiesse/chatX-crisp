import io from "socket.io-client";
import {ref} from "vue";
import {defineStore} from "pinia"

export const useSocketStore = defineStore('socket', () => {
    const socketClient = ref(null)
    const connect = (url) => {
        if (socketClient.value === null) {
            socketClient.value = io(url)
        }
    }

    return {
        socketClient,
        connect
    }
})