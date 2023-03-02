<template>
    <div id="app">
        <div id="nav">
<!--            <Router-link to="/1">На футбол</Router-link>-->
<!--            <br>-->
<!--            <Router-link to="/2">Відпочити</Router-link>-->
        </div>
        <Header
            v-if="parsedDate"
            :match-date="parsedDate"
            :home-team="homeTeam"
            :away-team="awayTeam"
        >
        </Header>
        <router-view></router-view>

        <p>{{ Window?.Telegram?.WebApp?.initData }}</p>
    </div>
</template>




<script>
import Header from './components/Header'
import { computed, ref } from 'vue';

export default {
    name: 'App',
    components: {
        Header,
    },

    setup() {
        window.Telegram.WebApp.MainButton.text = 'Забронювати'
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.text = 'Забронювати'
        const initData = ref(window.Telegram?.WebApp?.initData?.user);
        const initDataUnsafe = ref(window.Telegram?.WebApp?.initDataUnsafe?.user);

        const urlParams = new URLSearchParams(window.location.search);
        const homeTeam = computed(() => {
            return urlParams.get('homeTeam') || 'Dynamo';
        });
        const awayTeam = computed(() => {
            return urlParams.get('awayTeam') || 'Shakhtar';
        });
        const matchDate = computed(() => {
            return `${urlParams.get('date')} ${urlParams.get('time')}` || '01.01.01 14:00';
        });

        const parsedDate = computed(() => {
            const dateString = urlParams.get('parsedDate') || null;
            const dateObj = new Date(dateString);
            return dateObj;
        });

        // function submit() {
        //     alert('submit')
        // }

        console.log(window.Telegram.WebApp, 'window.Telegram.WebApp')

        // window.Telegram.MainButton.onClick(submit)


        return {
            matchDate,
            homeTeam,
            awayTeam,
            parsedDate,
            initData,
            initDataUnsafe,
        }
    }
}
</script>

<style>
@import "./css/main.css";
@import "./css/reset.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: var(--tg-theme-text-color);*/
  color: mintcream;
  margin: 0 auto;
  padding: 0;
  /*width: 100vw;*/
  /*height: 100vh;*/
  /*background: var(--tg-theme-bg-color);*/
  max-width: 450px;
}
</style>
