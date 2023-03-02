import { createRouter, createWebHistory } from 'vue-router'
import MatchdayForm from '../components/MatchdayForm';
import NotMatchdayForm from '../components/NotMatchdayForm';
const routes = [
    {
        path: '/',
        name: 'home',
        component: MatchdayForm
    },
    {
        path: '/matchday',
        name: 'MatchdayForm',
        component: MatchdayForm
    },
    {
        path: '/notMatchday',
        name: 'NotMatchDay',
        component: NotMatchdayForm
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
