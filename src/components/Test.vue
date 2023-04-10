<template>
    <h1>test</h1>
    {{ name }}
    <v-btn @click="alert">
        alert
    </v-btn>
</template>

<script>
import { ref } from 'vue';
export default {
    name: "Test",
    setup() {
        let name = ref(window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula');

        function alert() {
            alert('test')
        }

        return {
            name,
            alert
        }
    }
}
</script>

<style scoped>

</style>