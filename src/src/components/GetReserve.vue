<template>
    <v-card style="position: absolute; top: 0; left: 0">
        <h1></h1>
    </v-card>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getUrlParam } from '../helpers/getUrlParams';

export default {
    name: "getReserve.vue",
    setup() {
        const reserve = ref({});
        console.log(12312312)
        onMounted(async() => {
            const id = getUrlParam('id');


            try {
                const result = await axios.post('http://localhost:8085/getReserve', { id });
                reserve.value = result.data;
                console.log(result.data);
            } catch(e) {
                console.log(e)
            }
        })
    }

}
</script>

<style lang="scss" scoped>

</style>