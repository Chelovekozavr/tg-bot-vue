<template>
<!--    <hr>-->
    <div class="date">
        <h4>{{ matchDate }}</h4>
    </div>
    <div class="title">
        <h1>{{ homeTeam }}</h1>
        <h1>{{ awayTeam }}</h1>
    </div>
<!--    <hr>-->
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
    name: 'Header',
    setup() {
        const urlParams = new URLSearchParams(window.location.search);
        const homeTeam = computed(() => {
            return urlParams.get('homeTeam');
        });
        const awayTeam = computed(() => {
            return urlParams.get('awayTeam');
        });
        const matchDate = computed(() => {
            return `${urlParams.get('date')} ${urlParams.get('time')}` || '01.01.01 14:00';
        });

        return {
            matchDate,
            homeTeam,
            awayTeam
        }
        // http://localhost:8080/1?topMatch=true&homeTeam=Динамо&awayTeam=Інгулець&date=01.03.2022&time=14:00

        // function getMatchTitle() {
        //     title: obj.title,
        //         time: obj.time,
        //         date: obj.date
        //     let urlParams = new URLSearchParams(window.location.search);
        //     console.log(urlParams.has('matchName'));
        //     console.log(urlParams.get('matchName'));
        //
        //     return urlParams.get('matchName');
        //     `${urlParams.get('homeTeam')}`
        // }
        //
        // function getMatchDate() {
        //     let urlParams = new URLSearchParams(window.location.search);
        //
        //     return `${urlParams.get('date')} ${urlParams.get('time')}` || '01.01.01 14:00';
        // }
        //
        // onMounted(() => {
        //     getMatchTitle();
        //     getMatchDate();
        // })

    }
}
</script>

<style scoped>
.title {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>