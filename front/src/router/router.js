import { createRouter, createWebHistory } from 'vue-router';
import ChatRoom from '../views/ChatRoom.vue';
import Home from "../components/Home.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/chat/:roomName', component: ChatRoom },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
