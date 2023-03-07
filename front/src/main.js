import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {createRouterInstance} from "./router/router.js";

const app = createApp(App)
const pinia = createPinia()

app.use(createRouterInstance())
    .use(pinia)
    .mount('#app')
