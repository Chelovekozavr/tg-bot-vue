<template>
    <div class="header-container pa-4">
        <img
            :src="homeTeamLogo"
            alt=""
            class="team-logo"
        >
        <div class="match-name-container px-2">
            <h4>4 березня, 17:00</h4>
            <div class="match-name">
              <p class="text-h6">{{ homeTeam }}</p>
              <p class="text-h6">{{ awayTeam }}</p>
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

<style scoped>
.header-container {
    background-image: url("../assets/background.png");
    background-repeat: repeat;
    display: flex;
    justify-content: space-between;
}
.match-name-container {
  width: 100%;
}
.match-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.team-logo {
    max-height: 60px;
}
</style>
