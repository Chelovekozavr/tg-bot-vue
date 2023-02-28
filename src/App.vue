<template>
    <div id="app">
        <div id="nav">
            <Router-link to="/1">На футбол</Router-link>
            <br>
            <Router-link to="/2">Відпочити</Router-link>
        </div>
        <Header></Header>
        <router-view></router-view>

        <p>{{ Window?.Telegram?.WebApp?.initData }}</p>
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
        console.log(Window?.Telegram)
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
  margin: 0;
  padding: 0;
  background: var(--tg-theme-bg-color);
}
</style>
