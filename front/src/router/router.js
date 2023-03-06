import { createRouter, createWebHistory } from 'vue-router';
import ChatRoom from '../views/ChatRoom.vue';
import Home from "../components/Home.vue";
import Signup from "../views/Signup.vue";

const routes = [
    { path: '/chatRoom', component: Home, meta: { requiresAuth: true } },
    { path: '/chat/:roomName', component: ChatRoom, meta: { requiresAuth: true } },
    { path: '/signup', component: Signup}
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !authStore.token) {
//         // If the route requires authentication and the user is not authenticated,
//         // redirect to the login page
//         next('/signin');
//     } else {
//         // Otherwise, allow the user to proceed to the requested route
//         next();
//     }
// });
