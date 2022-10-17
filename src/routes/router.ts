import { createRouter, createWebHistory } from "vue-router";
import Main from './Main.vue'
import Second from './Second.vue'
import NotFound from './NotFound.vue'

const routes = [
    {path: '/', name: 'main', component: Main, alias: ["/main"]},
    {path: '/second', name: 'second', component: Second},
    {path: '/:uri(.*)*', name: 'notFound', component: NotFound},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;