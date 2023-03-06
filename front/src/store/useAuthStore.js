import {inject, ref} from "vue";
import {defineStore} from "pinia"
import axios from "axios";

export const useAuthStore = defineStore('auth', () => {
    const axios = inject('axios')

    const signup = async(username, password) => {
        try {
            const response = await axios.post('/auth/signup', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        } catch (error) {
            console.log(error)
        }
    }

    const signin = async(username, password) => {
        try {
            const response = await axios.post('/auth/signin', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        } catch (error) {
            console.log(error)
        }
    }

    return {
        signup,
        signin
    }
})