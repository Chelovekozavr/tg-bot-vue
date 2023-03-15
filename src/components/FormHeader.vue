<template>
    <v-divider class="mb-4"></v-divider>
    <div class="header-container">
        <div class="team">
            <img
                :src="homeTeamLogo"
                alt=""
                class="team-logo mb-4"
            >
            <p class="text-h5">{{ homeTeam }}</p>
        </div>
        <h4>{{ matchDate }}</h4>
        <div class="team">
            <img
                :src="awayTeamLogo"
                alt=""
                class="team-logo mb-4"
            >
            <p class="text-h5">{{ awayTeam }}</p>
        </div>
    </div>
    <!--        <div class="header-title">-->
    <v-divider class="my-4"></v-divider>
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

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
}
.team {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.team-logo {
    max-height: var(--spacing-xxxl);
    margin-bottom: var(--spacing-m);
}
</style>