import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";

export const useHttpClientStore = defineStore('http', () => {
    const httpClient = ref(null)

    const initHttpClient = () => {
        if (httpClient.value === null) {
            httpClient.value = axios.create({
                baseURL: 'http://localhost:3000/',
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