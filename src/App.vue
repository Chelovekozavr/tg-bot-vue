<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>

        <p>{{ window.Telegram.WebApp.initData }}</p>
    </div>
</template>




<script>
import Header from './components/Header'

export default {
    name: 'App',
    components: {
        Header,
        // MatchdayForm
    },
    created() {
        console.log(window.Telegram)
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--tg-theme-text-color);
  margin-top: 60px;
  background: var(--tg-theme-bg-color);
}
</style>
