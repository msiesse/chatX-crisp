import {computed, ref} from "vue";
import {defineStore, storeToRefs} from "pinia"
import {useHttpClientStore} from "./useHttpClientStore.js";
import jwt_decode from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
    const {httpClient} = storeToRefs(useHttpClientStore())
    const token = ref(localStorage.getItem('token') || '')
    const username = computed(() => {
        const decoded = jwt_decode(token.value)
        return decoded.username
    })

    const signup = async (username, password) => {
        const response = await httpClient.value.post('/auth/signup', {
            username: username,
            password: password
        });
        localStorage.setItem('token', response.data.token);
        httpClient.value.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        token.value = response.data.token
    }

    const signin = async (username, password) => {
        const response = await httpClient.value.post('/auth/signin', {
            username: username,
            password: password
        });
        token.value = response.data.token
        localStorage.setItem('token', token.value);
        httpClient.value.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }

    const removeToken = async () => {
        localStorage.setItem('token', '')
        httpClient.value.defaults.headers.common['Authorization'] = ''
        token.value = ''
    }

    return {
        signup,
        signin,
        removeToken,
        username,
        token
    }
})