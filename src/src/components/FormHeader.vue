<template>
    <div class="header-container pa-4">
        <img
            :src="homeTeamLogo"
            alt=""
            class="team-logo"
        >
        <div class="match-name-container px-2">
            <h4>{{ matchDate }}</h4>
            <div class="match-name">
              <h2>{{ homeTeam }}</h2>
              <h2>{{ awayTeam }}</h2>
            </div>
        </div>
        <img
            :src="awayTeamLogo"
            alt=""
            class="team-logo"
        >
    </div>
    <v-divider></v-divider>
</template>

<script>
import { computed, ref } from 'vue';
import { getUrlParam } from "../helpers/getUrlParams";

export default {
    name: 'FormHeader',
    props: {
        homeTeamLogo: String,
        awayTeamLogo: String,
    },
    setup() {
        const homeTeam = ref(getUrlParam('homeTeam'));
        const awayTeam = ref(getUrlParam('awayTeam'));

        const matchDate = computed(() => {
            const dateString = getUrlParam('parsedDate') || null;
            const dateObj = new Date(dateString);

            return dateObj.toLocaleString(['uk-UA'], {
                year: 'numeric',
                month:"2-digit",
                day:"2-digit",
                hour: '2-digit',
                minute:'2-digit',
            }).split(',').join('');
        });

        //     const urlParams = new URLSearchParams(window.location.search);
        //     const homeTeam = computed(() => {
        //         return urlParams.get('homeTeam');
        //     });

        return {
            matchDate,
            homeTeam,
            awayTeam,
        }
    }
}
</script>

<style lang="scss">

</style>