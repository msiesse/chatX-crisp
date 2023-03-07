import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {useConfigStore} from "./useConfigStore.js";

export const useHttpClientStore = defineStore('http', () => {
    const httpClient = ref(null)
    const {baseUrl} = storeToRefs(useConfigStore())

    const initHttpClient = () => {
        if (httpClient.value === null) {
            httpClient.value = axios.create({
                baseURL: baseUrl.value,
                headers: {
                    common: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
                    }
                }
            })
        }
    }

    return {
        httpClient,
        initHttpClient
    }
})