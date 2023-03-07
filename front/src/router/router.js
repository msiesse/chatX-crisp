import {createRouter, createWebHistory} from 'vue-router';
import ChatRoom from '../views/ChatRoom.vue';
import Home from "../views/ChatRoomCreation.vue";
import Signup from "../views/Signup.vue";
import axios from "axios";
import Signin from "../views/Signin.vue";

export const createRouterInstance = () => {
    const routes = [
        {path: '/chatRoom', component: Home, meta: {requiresAuth: true}},
        {path: '/chat/:roomName', component: ChatRoom, meta: {requiresAuth: true}},
        {path: '/signup', component: Signup},
        {path: '/signin', component: Signin}
    ];

    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

    axios.defaults.baseURL = 'http://localhost:3000/';

    router.beforeEach(async (to, from, next) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` || ''
        const token = localStorage.getItem('token') || ''
        if (to.meta.requiresAuth) {
            if (!token) {
                next('/signin');
            } else {
                try {
                    await axios.post('/auth/validate');
                    next();
                } catch (error) {
                    localStorage.setItem('token', '');
                    next('/signup');
                }
            }
        } else {
            next();
        }
    });

    router.beforeEach(async(to, from, next) => {
        const token = localStorage.getItem('token') || ''
        if (token !== '' && (to.path === '/signin' || to.path ==='/signup')) {
            next('/chatRoom')
        } else {
            next()
        }
    })

    router.beforeEach(async(to, from, next) => {
        const regex = /^\/chat\/.*$/;
        if (routes.some(route => (route.path === to.path || regex.test(to.path)))) {
            next()
        } else {
            next('/signup')
        }
    })

    return router
}
