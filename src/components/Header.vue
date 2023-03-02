<template>
    <hr>
    <div class="date">
        <h4>{{ matchDate }}</h4>
    </div>
    <div class="header-title">
        <h1>{{ homeTeam }}</h1>
        <h1>{{ awayTeam }}</h1>
        {{ parsedDate }}
    </div>
    <hr>
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

        const parsedDate = computed(() => {
            return urlParams.get('parsedDate');
        })
        return {
            matchDate,
            homeTeam,
            awayTeam,
            parsedDate
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