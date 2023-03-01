<template>
    <div id="app">
        <h2>
            {{ initData || 'noData' }}
            {{ initDataUnsafe || 'noData' }}
        </h2>
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
import { onMounted, ref } from 'vue';


export default {
    name: 'App',
    components: {
        Header,
    },
    setup() {
        const initData = ref(window.Telegram?.webApp?.initData?.user);
        const initDataUnsafe = ref(window.Telegram?.webApp?.initDataUnsafe?.user);

        onMounted(() => {
            console.log(window.Telegram);
        })

        return {
            initData,
            initDataUnsafe,
        }
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
