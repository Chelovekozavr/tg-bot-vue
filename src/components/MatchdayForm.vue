<template>
    <form @submit.prevent="onSubmit" className="form">
        <h2 class="page-title">Бронювання</h2>
        <div class="section">
            <p class="title">На коли:</p>
            <div class="input-container-radio">
                <label
                    v-for="(item, index) in matchTimeOptions"
                    :key="`${index}-${item}-place`"
                    class="radio"
                >
                    <input
                        type="radio"
                        :value="item"
                        v-model="time"
                        id="item"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">{{ item }}</span>
                </label>
            </div>
        </div>

        <div class="section-with-error">
            <p class="title"><label>Для кого:</label></p>
            <div class="input-container">
                <input
                    class="text-input"
                    type="text"
                    id="name"
                    v-model="name"
                >
                <p v-if="errors.nameError.error" class="error-msg">
                    {{ errors.nameError.text}}
                </p>
            </div>
        </div>

        <div class="section-with-error">
            <p class="title"><label htmlFor="guests">На скількох:</label></p>
            <div class="input-container input-with-buttons-container">
                <button
                    class="input-btn btn"
                    type="button"
                    @click="minusGuests"
                >
                    -
                </button>
                <input
                    class="text-input input-with-buttons"
                    id="guests"
                    type="number"
                    :value="guests"
                    @input="updateGuests"
                >
                <button
                    class="input-btn btn"
                    type="button"
                    @click="plusGuests"
                >
                    +
                </button>
                <p v-if="errors.guestsError.error" class="error-msg">
                    {{ errors.guestsError.text}}
                </p>
            </div>
        </div>

        <div class="section">

            <p class="title">Побажання по розміщенню:</p>
            <div class="input-container-radio">
                <label
                    v-for="(item, index) in places"
                    :key="`${index}-${item.value}-place`"
                    class="radio"
                >
                    <input
                        type="radio"
                        :value="item.value"
                        v-model="place"
                        :id="item.title"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">{{ item.titleUa }}</span>
                </label>
            </div>
        </div>
        <p
            v-if="topMatch"
            class="top-match-comment"
        >
            * подія підвищеного інтересу. Будь ласка, приходьте заздалегідь. Всі бронвання згорають за 15 хвилин до гри
        </p>
    </form>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue';
import { places } from '../helpers/placeEnum';
import axios from 'axios';
export default {
    name: "MatchdayForm",
    setup() {
        const urlParams = new URLSearchParams(window.location.search);
        const topMatch = urlParams.get('topMatch') === 'true';
        const matchTimeOptions = computed(() => {
            const date = new Date(urlParams.get('parsedDate'))
            let tempDate = date;
            const topMatch = urlParams.get('topMatch');
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


        let time = ref(matchTimeOptions.value[0]);
        let guests = ref(1);
        let place = ref(1);
        let name = ref('Kaligula');

        if(Object.keys(window.Telegram?.WebApp?.initDataUnsafe).length) {
            name.value = window.Telegram.WebApp.initDataUnsafe.user.username;
        }

        let errors = reactive({
            nameError: {
                error: false,
                text: ''
            },
            guestsError: {
                error: false,
                text: ''
            }
        });

        watch(name, (currentValue) => {
            if(currentValue.length <= 3) {
                errors.nameError.error = true;
                errors.nameError.text = 'Не менше 3 символів';
                return;
            } else if(currentValue.length >= 15) {
                errors.nameError.error = true;
                errors.nameError.text = 'Не більше 15 символів';
                return;
            } else {
                errors.nameError.error = false;
                errors.nameError.text = '';
                return;
            }
        })
        watch(guests, (currentValue) => {
            if(currentValue < 1) {
                errors.guestsError.error = true;
                errors.guestsError.text = 'Недопустиме значення';
                return;
            } else if(currentValue > 20) {
                errors.guestsError.error = true;
                errors.guestsError.text = 'Максимальне значення — 20';
                return;
            } else {
                errors.guestsError.error = false;
                errors.guestsError.text = '';
                return;
            }
        });
        function minusGuests() {
            alert(window.Telegram.WebApp.initDataUnsafe.user.username)
            alert(window.Telegram.WebApp.initDataUnsafe.user.username)
            if(guests.value <=1) {
                return;
            }
            guests.value--;
        }
        function plusGuests() {
            if(guests.value >= 21) {
                errors.guestsError.error = true;
                errors.guestsError.text = 'Максимальне значення — 20';
                return;
            }
            guests.value++;
        }
        function updateGuests(e) {
            guests.value = e.target.value;
        }
        function updateName(e) {
            name.value = e;
        }
        async function onSubmit() {
            if(errors.nameError.error || errors.guestsError.error) {
                return;
            }

            const data = {
                name: name.value,
                time: time.value,
                guests: guests.value,
                place: places.find(item => item.value === place.value).value,
                query_id: window?.Telegram?.WebApp?.initDataUnsafe?.query_id || 1123,
                date: urlParams.get('date'),
            }
            // window.Telegram.WebApp.sendData(JSON.stringify(data));
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

            sendData();
        }

        if(window.Telegram) {
            window.Telegram.WebApp.MainButton.onClick(onSubmit);
        }

        return {
            time,
            name,
            guests,
            place,
            errors,
            topMatch,
            places,
            matchTimeOptions,
            updateName,
            updateGuests,
            minusGuests,
            plusGuests,
            onSubmit
        }
    }
}
</script>
<style scoped>
</style>
