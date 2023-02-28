<template>
    <div id="app">
        <Form></Form>
    </div>
</template>

<script>
import Form from './components/Form.vue';

export default {
    name: 'App',
    components: {
        Form
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
  background: var(--tg-color-scheme);
}
</style>
