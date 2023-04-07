<template>
    <div style="position: absolute; top: 0; left: 0px">
        <h1>wqwqwe</h1>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted } from 'vue';
import { getUrlParam } from '../helpers/getUrlParams';

export default {
    name: "getReserve.vue",
    setup() {
        onMounted(async() => {
            const id = getUrlParam('id');


            try {
                const result = await axios.post('http://localhost:8085/getReserve', { id });

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