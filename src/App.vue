<template>
    <div id="app" class="app">
        <div id="nav">
        </div>
        <Header
            v-if="parsedDate"
            :match-date="parsedDate"
            :home-team="homeTeam"
            :away-team="awayTeam"
        >
        </Header>
        <router-view></router-view>
    </div>
</template>




<script>
import Header from './components/Header'
import { computed } from 'vue';

export default {
    name: 'App',
    components: {
        Header,
    },

    setup() {
        window.Telegram.WebApp.MainButton.text = 'Забронювати'
        window.Telegram.WebApp.MainButton.isVisible = true;

        // const initDataUnsafe = ref(window.Telegram?.WebApp?.initDataUnsafe?.user);

        const urlParams = new URLSearchParams(window.location.search);
        const homeTeam = computed(() => {
            return urlParams.get('homeTeam') || 'Dynamo';
        });
        const awayTeam = computed(() => {
            return urlParams.get('awayTeam') || 'Shakhtar';
        });
        // const matchDate = computed(() => {
        //     return `${urlParams.get('date')} ${urlParams.get('time')}` || '01.01.01 14:00';
        // });

        const parsedDate = computed(() => {
            const dateString = urlParams.get('parsedDate') || null;
            const dateObj = new Date(dateString);
            return dateObj;
        });

        return {
            homeTeam,
            awayTeam,
            parsedDate,
        }
    }
}
</script>

<style>
@import "./css/main.css";
@import "./css/reset.css";

</style>
