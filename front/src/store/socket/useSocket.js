import io from "socket.io-client";
import {ref} from "vue";
import {defineStore, storeToRefs} from "pinia"
import {useAuthStore} from "../useAuthStore.js";

export const useSocketStore = defineStore('socket', () => {
    const socketClient = ref(null)
    const { token } = storeToRefs(useAuthStore())
    const connect = (url) => {
        if (socketClient.value === null) {
            socketClient.value = io(url, {
                query: `token=${token.value}`
            })
        }
    }

    return {
        socketClient,
        connect
    }
})