<template>
    <div id="app">
        <div id="nav">
<!--            <Router-link to="/1">На футбол</Router-link>-->
<!--            <br>-->
<!--            <Router-link to="/2">Відпочити</Router-link>-->
        </div>
        <Header></Header>
        <router-view></router-view>

        <p>{{ Window?.Telegram?.WebApp?.initData }}</p>
    </div>
</template>




<script>
import Header from './components/Header'
import {  ref } from 'vue';


export default {
    name: 'App',
    components: {
        Header,
    },
    setup() {
        const initData = ref(window.Telegram?.WebApp?.initData?.user);
        const initDataUnsafe = ref(window.Telegram?.WebApp?.initDataUnsafe?.user);

        return {
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
