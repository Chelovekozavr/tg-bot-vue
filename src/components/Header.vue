<template>
    <div>
        <hr>
        <div class="header-container">
            <div class="team">
                <img
                    :src="homeTeamLogo"
                    alt=""
                    class="team-logo"
                >
                <h1>{{ homeTeam }}</h1>
            </div>
            <h4>{{ formattedDate }}</h4>
            <div class="team">
                <img
                    :src="awayTeamLogo"
                    alt=""
                    class="team-logo"
                >
                <h1>{{ awayTeam }}</h1>
            </div>
        </div>
<!--        <div class="header-title">-->
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
        awayTeam: String,
        homeTeamLogo: String,
        awayTeamLogo: String
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

</style>