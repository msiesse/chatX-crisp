import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios';
import {router} from "./router/router.js";
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` || ''

app.use(router)
    .use(pinia)
    .provide('axios', axios)
    .mount('#app')
