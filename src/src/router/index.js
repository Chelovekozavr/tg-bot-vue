import { createRouter, createWebHistory } from 'vue-router'
import GetReserve from "../components/GetReserve";
import Form from '../components/Form';

const routes = [
    {
        path: '/',
        name: 'Form',
        component: Form,
        props: { currentComponent: 'FormNotMatchday' }
    },
    {
        path: '/matchday',
        name: 'FormMatchday',
        component: Form,
        props: { currentComponent: 'FormMatchday' }
    },
    {
        path: '/notMatchday',
        name: 'NotMatchDay',
        component: Form,
        props: { currentComponent: 'FormNotMatchday' }
    },
    {
        path: '/edit',
        name: 'Edit',
        component: Form,
        props: { currentComponent: 'FormEdit' }
    },
    {
        path: '/getReserve',
        name: 'getReserve',
        component: GetReserve,
    },
];
const router = createRouter({
    base: '/bot/',
    history: createWebHistory(process.env.BASE_URL),
    routes
});

console.log(process.env.BASE_URL)

export default router;
