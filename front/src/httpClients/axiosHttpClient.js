export class AxiosHttpClient {
    constructor(axios) {
        this.axios = axios
    }

    async post(route, data) {
        return this.axios.post(route, data)
    }

    setToken(token) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}