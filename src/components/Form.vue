<template>
    <v-main v-show="!isLoading">
        <v-card
            class="mx-auto"
            max-width="450"
        >
            <router-view
                :home-team-logo="homeTeamLogo"
                :home-team="homeTeam"
                :away-team-logo="awayTeamLogo"
                :away-team="awayTeam"
                :name-rules="nameRules"
                :phone-rules="phoneRules"
                :guests-rules="guestsRules"
                :agreement-rules="agreementRules"
                :match-time-options="matchTimeOptions"
                @on-submit="onSubmit"
            ></router-view>
        </v-card>
    </v-main>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import { getUrlParam } from "../helpers/getUrlParams";
import getTeamLogo from "../helpers/ctawler";
import axios from "axios";

export default {
    name: 'App',
    setup() {
        let isLoading = ref(true);
        let homeTeamLogo = ref('');
        let homeTeam = ref(getUrlParam('homeTeam'));
        let awayTeamLogo = ref('');
        let awayTeam = ref(getUrlParam('awayTeam'));

        const nameRules = reactive([
            value => {
                if (value?.length >= 3) {
                    return true;
                }

                return 'Не менше 3 символів';
            },
            value => {
                if (value?.length <= 20) {
                    return true;
                }

                return 'Не більше 20 символів';
            }
        ]);
        const guestsRules = reactive( [
            value => {
                if (+value >= 1 && Number.isInteger(+value)) {
                    return true;
                }

                return 'Недопустиме значення';
            },
            value => {
                if (+value <= 20) {
                    return true;
                }

                return 'Не більше 20';
            }
        ]);
        const phoneRules = reactive( [
            value => {
                if (!value || +value.length < 14) {
                    return 'Недопустиме значення';
                }

                return true;
            },
        ]);
        const agreementRules = reactive( [
            value => {
                if (!value) {
                    return `Обов'язкове поле`;
                }

                return true;
            },
        ]);

        const matchTimeOptions = computed(() => {
            const date = new Date(getUrlParam('parsedDate'));
            let tempDate = date;
            const topMatch = getUrlParam('topMatch');
            const msPerMinute = 60000;
            const timeGap = 15;
            const topMatchTimeGap = 30;

            function getTimeOptions(date) {
                if(topMatch) {
                    tempDate = minusTime(date, topMatchTimeGap);
                }
                function minusTime(time) {
                    tempDate = new Date(time - timeGap * msPerMinute);
                    return tempDate;
                }
                function formatOption(opt) {
                    return opt.toLocaleString("uk-UA", {hour: '2-digit', minute: '2-digit'});
                }

                return [
                    formatOption(minusTime(tempDate, timeGap)),
                    formatOption(minusTime(tempDate, timeGap)),
                    formatOption(minusTime(tempDate, timeGap)),
                ]
            }
            const res = getTimeOptions(date).reverse();

            return res;
        });


        async function onSubmit(data, onEdit = false) {
            const isAdmin = getUrlParam('isAdmin');
            const url = `http://localhost:8085/${onEdit ? 'editReserve' : 'reserve'}${isAdmin ? 'Admin' : ''}`;

            async function sendData() {
                try {
                    const result = await axios.post(url, { ...data });
                    console.log(result.data);
                    return result.data;
                } catch(e) {
                    console.log(e)
                }
            }

            await sendData();
            window.Telegram?.WebApp?.close();
        }

        onMounted(async () => {
            const url = getUrlParam('url');

            if(url) {
                const flashScoreData = await getTeamLogo(url);
                homeTeamLogo.value = `https://www.flashscore.ua${flashScoreData.home[0].image_path}`;
                awayTeamLogo.value = `https://www.flashscore.ua${flashScoreData.away[0].image_path}`;
            }

            isLoading.value = false;
        });

        return {
            isLoading,
            homeTeamLogo,
            homeTeam,
            awayTeam,
            awayTeamLogo,
            nameRules,
            phoneRules,
            guestsRules,
            agreementRules,
            matchTimeOptions,
            onSubmit,
        }
    }
}
</script>
