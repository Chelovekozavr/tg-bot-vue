<template>
    <div style="position: absolute; top: 0; left: 0px">
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
        <v-divider></v-divider>    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getUrlParam } from '../helpers/getUrlParams';
import getTeamLogo from "../helpers/ctawler";

export default {
    name: "getReserve.vue",
    setup() {
        let isLoading = ref(true);
        let reserve = ref({});
        let homeTeamLogo = ref('');
        let awayTeamLogo = ref('');


        onMounted(async() => {
            const id = getUrlParam('id');

            try {
                const result = await axios.post('http://localhost:8085/getReserve', { id });
                if(result.url) {
                    const flashScoreData = await getTeamLogo(result.url);
                    homeTeamLogo.value = `https://www.flashscore.ua${flashScoreData.home[0].image_path}`;
                    awayTeamLogo.value = `https://www.flashscore.ua${flashScoreData.away[0].image_path}`;
                }

                console.log(result.data);
            } catch(e) {
                console.log(e);
            }



            isLoading.value = false;
        });

        return {
            isLoading,
            reserve,
            homeTeamLogo,
            awayTeamLogo,

        }
    }

}
</script>

<style lang="scss" scoped>

</style>