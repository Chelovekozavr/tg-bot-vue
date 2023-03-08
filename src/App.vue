<template>
    <div
        v-if="!isLoading"
        id="app"
        class="app"
    >
        <div id="nav">
        </div>
        <Header
            v-if="parsedDate"
            :match-date="parsedDate"
            :home-team="homeTeam"
            :home-team-logo="homeTeamLogo"
            :away-team="awayTeam"
            :away-team-logo="awayTeamLogo"
        >
        </Header>
        <router-view></router-view>
    </div>
</template>




<script>
import Header from './components/Header'
import { ref, computed, onMounted } from 'vue';
import getTeamLogo from './helpers/ctawler';


export default {
    name: 'App',
    components: {
        Header,
    },

    setup() {
        let homeTeamLogo = ref('');
        let awayTeamLogo = ref('');
        let isLoading = ref(false);

        window.Telegram.WebApp.MainButton.text = 'Забронювати'
        window.Telegram.WebApp.MainButton.isVisible = true;

        // const initDataUnsafe = ref(window.Telegram?.WebApp?.initDataUnsafe?.user);

        const urlParams = new URLSearchParams(window.location.search);
        const homeTeam = computed(() => {
            return urlParams.get('homeTeam') || 'Dynamo';
        });
        const awayTeam = computed(() => {
            return urlParams.get('awayTeam') || 'Shakhtar';
        });

        const parsedDate = computed(() => {
            const dateString = urlParams.get('parsedDate') || null;
            const dateObj = new Date(dateString);
            return dateObj;
        });


        onMounted(async () => {
            isLoading.value = true;
            const urlParams = new URLSearchParams(window.location.search);
            const url = urlParams.get('url');
            const flashScoreData = await getTeamLogo(url);
            homeTeamLogo.value = `https://www.flashscore.ua${flashScoreData.home[0].image_path}`;
            awayTeamLogo.value = `https://www.flashscore.ua${flashScoreData.away[0].image_path}`;
            isLoading.value = false;
        });

        return {
            homeTeam,
            awayTeam,
            homeTeamLogo,
            awayTeamLogo,
            parsedDate,
            isLoading,
        }
    }
}
</script>

<style>
@import "./css/main.css";
@import "./css/reset.css";

</style>
