import io from "socket.io-client";
import {ref} from "vue";
import {defineStore, storeToRefs} from "pinia"
import {useAuthStore} from "./useAuthStore.js";
import {useConfigStore} from "./useConfigStore.js";

export const useSocketStore = defineStore('socket', () => {
    const socketClient = ref(null)
    const {token} = storeToRefs(useAuthStore())
    const {baseUrl} = storeToRefs(useConfigStore())

    if (socketClient.value === null) {
        socketClient.value = io(baseUrl.value, {
            query: `token=${token.value}`
        })
    }

    return {
        socketClient,
    }
})