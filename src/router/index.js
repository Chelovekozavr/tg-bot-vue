import { createRouter, createWebHistory } from 'vue-router'
import FormMatchday from '../components/FormMatchday';
import FormNotMatchday from '../components/FormNotMatchday';
import Form from '../components/Form';

const routes = [
    {
        path: '/',
        name: 'home',
        props: true,
        components: {
            default:  FormNotMatchday,
            'wrapper': Form,
        }
    },
    {
        path: '/matchday',
        name: 'FormMatchday',
        props: true,
        components: {
            default:  FormMatchday,
            'wrapper': Form,
        }
    },
    {
        path: '/notMatchday',
        name: 'NotMatchDay',
        props: true,
        components: {
            default:  FormNotMatchday,
            'wrapper': Form,
        }
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
