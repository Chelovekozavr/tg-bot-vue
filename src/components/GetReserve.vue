<template>
    <h1>test</h1>
    {{ name }}
    <v-btn @click="alertxx()">
        alert
    </v-btn>
</template>

<script>
import { ref } from 'vue';
export default {
    name: "Test",
    setup() {
        let name = ref(window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula');

        function alertxx() {
            let arr = window.Telegram?.WebApp?.initDataUnsafe;

            for(let key in arr) {
                alert(arr[key])
            }
            alert('text')

            return
        }

        return {
            name,
            alertxx
        }
    }
}
</script>

<style scoped>

</style>