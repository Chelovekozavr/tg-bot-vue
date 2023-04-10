import { createRouter, createWebHistory } from 'vue-router'
import GetReserve from "../components/GetReserve";
import GetReserve2 from "../components/GetReserve2";
import Form from '../components/Form';
import Test from '../components/Test';
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
        name: 'GetReserve2',
        component: GetReserve2,
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
    },
];
const router = createRouter({
    base: '/bot/',
    history: createWebHistory(process.env.BASE_URL),
    routes
});

console.log(process.env.BASE_URL)

export default router;
