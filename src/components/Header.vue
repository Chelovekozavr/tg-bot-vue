<template>
    <div>
        <hr>
        <div class="date">
            <h4>{{ formattedDate }}</h4>
        </div>
        <div class="header-title">
            <h1>{{ homeTeam }}</h1>
            <h1>{{ awayTeam }}</h1>
        </div>
        <hr>
    </div>
</template>

<script>
import { computed } from 'vue';
export default {
    name: 'Header',
    props: {
        matchDate: Object,
        homeTeam: String,
        awayTeam: String
    },
    setup(props) {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const homeTeam = computed(() => {
    //         return urlParams.get('homeTeam');
    //     });
        const formattedDate = computed(() => {
            return props.matchDate.toLocaleString().split(',').join('');
        });
        return {
            formattedDate
        }
    }
}
</script>

<style scoped>
.header-title {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>