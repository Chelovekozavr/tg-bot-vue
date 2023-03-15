<template>
        <v-main v-show="!isLoading">
            <v-card
                class="mx-auto mt-4 pa-4"
                max-width="450"
            >
                <v-cart-item>
                    <router-view
                        :home-team-logo="homeTeamLogo"
                        :away-team-logo="awayTeamLogo"
                        :name-rules="nameRules"
                        :guests-rules="guestsRules"
                        :match-time-options="matchTimeOptions"
                        @on-submit="onSubmit"
                    ></router-view>
                </v-cart-item>
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
        // parsedDate: 2023-04-01T14:00:00.000Z,
        //     matchName: undefined,
        //     title: undefined,
        //     time: '17:00',
        //     date: '01.04.2023',
        //     homeTeam: 'Львів',
        //     awayTeam: 'Динамо К.',
        //     topMatch: false,
        //     url: 'https://www.flashscore.ua/match/Augn9Hpr/'
        // ?parsedDate=2023-04-01T14:00:00.000Z&time=17:00&date=01.04.2023&homeTeam=Львів&awayTeam=Динамо К.&topMatch=false&url=https://www.flashscore.ua/match/Augn9Hpr/

        let isLoading = ref(true);
        let homeTeamLogo = ref('');
        let awayTeamLogo = ref('');

        const nameRules = reactive( [
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

                return 'Максимальне значення — 20';
            }
        ]);

        const matchTimeOptions = computed(() => {
            const date = new Date(getUrlParam('parsedDate'))
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


        async function onSubmit(data) {
            console.log(data)
            window.Telegram.WebApp.sendData(JSON.stringify(data));
            async function sendData() {
                await axios.post('http://localhost:8085/reserve', {
                    ...data
                }).then((response) => {
                    console.log(response.data)
                    return response.data.done
                }).catch((err) => {
                    console.log(err)
                })
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

        window.Telegram?.WebApp?.MainButton?.onClick(onSubmit);

        return {
            isLoading,
            homeTeamLogo,
            awayTeamLogo,
            nameRules,
            guestsRules,
            matchTimeOptions,
            onSubmit,
        }
    }
}
</script>