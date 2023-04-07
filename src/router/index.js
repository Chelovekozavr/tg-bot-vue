import { createRouter, createWebHistory } from 'vue-router';
import Form from '../components/Form';
import FormMatchday from '../components/FormMatchday';
import FormNotMatchday from '../components/FormNotMatchday';
import FormEdit from '../components/FormEdit';
import GetReserve from '../components/GetReserve';

const routes = [
    {
        path: '/',
        name: 'home',
        props: true,
        component: Form,
        children: [
            { 
                path: '',
                component: FormNotMatchday,
                wrapper: Form
            },
            {
                path: '/matchday',
                component: FormMatchday,
                wrapper: Form
            },
            {
                path: '/notMatchday',
                component: FormNotMatchday,
                wrapper: Form
            },
            {
                path: '/edit',
                component: FormEdit,
                wrapper: Form
            },
        ]
    },
    {
        path: '/getReserve',
        name: GetReserve,
        props: true,
        components: {
            default:  GetReserve,
        }
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
