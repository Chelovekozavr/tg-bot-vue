<template>
    <h1>text pest</h1>
    <v-card
        v-if="!isLoading"
        class="ticket d-flex align-center"
    >
        <div>
            <div class="ticket__header mb-4 pa-4 flex-gap justify-space-between align-center">
                <img
                    :src="homeTeamLogo"
                    alt=""
                    class="ticket__logo"
                >
                <div class="px-2">
                    <h2>{{ matchDate }}</h2>
                    <div class="match-name">
                        <h1>{{ reserve.eventTitle }}</h1>
                    </div>
                </div>
                <img
                    :src="awayTeamLogo"
                    alt=""
                    class="ticket__logo"
                >
            </div>

            <div class="pa-4">
                <div class="grid mb-2">
                    <div class="grid__col">
                        <v-label>
                            Бронь №
                        </v-label>
                        <h3>
                            {{reserve.reserveId}}
                        </h3>
                    </div>
                    <div class="grid__col">
                        <v-label>
                            На ім'я
                        </v-label>
                        <h3>
                            {{ reserve.name }}
                        </h3>
                    </div>
                    <div class="grid__col">
                        <v-label>
                            Час
                        </v-label>

                        <h3>
                            {{ reserve.time }}
                        </h3>
                    </div>
                    <div class="grid__col">
                        <v-label>
                            Кількість гостей
                        </v-label>

                        <h3>
                            {{ reserve.guests }}
                        </h3>
                    </div>
                    <div class="grid__col">
                        <v-label>
                            Місце
                        </v-label>

                        <h3 class="ticket__place">
                            авіфлталвріф арлоівфра лрвілоалвіпавіфпа овіпаопівпар пцуофпаіваівавіф
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <v-divider class="border-opacity-50 mr-8" vertical></v-divider>
        <qrcode-vue :value="qrLink" :size="100" level="M" foreground="#173b61"/>

    </v-card>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getUrlParam } from '../helpers/getUrlParams';
import getTeamLogo from "../helpers/ctawler";
import QrcodeVue from 'qrcode.vue';


export default {
    name: "getReserve.vue",
    components: {
        QrcodeVue,
    },
    setup() {
        let isLoading = ref(true);
        let reserve = ref({});
        let homeTeamLogo = ref('');
        let awayTeamLogo = ref('');
        const qrLink = ref(window.location.href);
        const matchDate = ref('');

        onMounted(async() => {
            const id = getUrlParam('id');

            try {
                const result = await axios.post('http://localhost:8085/getReserve', { id });
                reserve.value = result.data;
                console.log(result.url)
            } catch(e) {
                console.log(e);
            }

            if(reserve.value.url) {
                console.log(reserve.value.url)
                const flashScoreData = await getTeamLogo(reserve.value.url);
                console.log(flashScoreData)
                homeTeamLogo.value = `https://www.flashscore.ua${flashScoreData.home[0].image_path}`;
                awayTeamLogo.value = `https://www.flashscore.ua${flashScoreData.away[0].image_path}`;
                console.log(homeTeamLogo, awayTeamLogo)
            }

            const dateString = reserve.value.date;
            const dateObj = new Date(dateString);
            // const splittedTime = reserve.value.time.split(':');

            // dateObj.setHours(splittedTime[0]);
            // dateObj.setMinutes(splittedTime[1]);
            matchDate.value = dateObj.toLocaleString(['uk-UA'], {
                year: 'numeric',
                month:"2-digit",
                day:"2-digit",
                // hour: '2-digit',
                // minute:'2-digit',
            }).split(',').join('');

            console.log(reserve.value);
            isLoading.value = false;
        });

        return {
            qrLink,
            matchDate,
            isLoading,
            reserve,
            homeTeamLogo,
            awayTeamLogo,
        }
    }

}
</script>

<style lang="scss" scoped>
.ticket {
    position: absolute;
    left: 0;
    top: 0;
    width: 800px;
    height: 250px;
    &__header {
        background-image: url("../assets/background.png");
        background-repeat: repeat;
        display: flex;
        height: 150px;
    }
    &__logo {
        max-height: 100px;

    }
}
.grid {
    display: grid;
    grid-gap: 40px;
    grid-template-columns: repeat(5, 5fr);
    &__col {
        &__col  > p, h3  {
            max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

}
</style>