import {ref} from "vue";
import {defineStore} from "pinia"

export const useConfigStore = defineStore('config', () => {
    const baseUrl = ref('')

    const initConfig = (baseUrlProp) => {
        baseUrl.value = baseUrlProp
    }

    return {
        baseUrl,
        initConfig
    }
})