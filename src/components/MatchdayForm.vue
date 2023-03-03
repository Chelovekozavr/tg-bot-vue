<template>
    <form @submit.prevent="onSubmit" className="form">
        <h2 class="page-title">Бронювання</h2>
        <div class="section">
            <p class="title">На коли:</p>
            <div class="input-container-radio">
                <label class="radio">
                    <input
                        type="radio"
                        value="16:00"
                        v-model="time"
                        id="16:00"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">16:00</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="17:00"
                        v-model="time"
                        id="17:00"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">17:00</span>
                </label>

                <label class="radio">
                    <input
                        type="radio"
                        value="18:00"
                        v-model="time"
                        id="18:00"
                    >
                    <span class="radio-btn"></span>
                    <span class="radio-txt">18:00</span>
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

        <button @click="onSubmit">subm</button>
    </form>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue';
import { places } from '../helpers/placeEnum';
// import axios from 'axios';
export default {
    name: "MatchdayForm",
    setup() {
        console.log(places)
        const urlParams = new URLSearchParams(window.location.search);
        const matchTime = computed(() => {
            return urlParams.get('time') || '14:00';
        });
        let time = ref('16:00');
        let name = ref(window?.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula');
        // let name = ref('Kaligula');
        let guests = ref(1);
        let place = ref(1);

        let errors = reactive({
            nameError: {
                error: false,
                text: ''
            },
            guestsError: {
                error: false,
                text: ''
            }
        })

        watch(name, (currentValue) => {
            console.log(currentValue, currentValue.length)
            if(currentValue.length <= 3) {
                console.log('less')
                errors.nameError.error = true;
                errors.nameError.text = 'Не менше 3 символів';

                return;
            } else if(currentValue.length >= 15) {
                console.log('more')
                errors.nameError.error = true;
                errors.nameError.text = 'Не більше 15 символів';

                return;
            } else {
                console.log('norm')
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
            if(guests.value <=1) {

                return;
            }
            guests.value--;
        }

        function plusGuests() {
            if(guests.value >= 20) {
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
            console.log(e, 'updateVal');
        }

        function onSubmit() {
            alert('onSubmit')
            if(errors.nameError.error || errors.guestsError.error) {
                alert('onerror')

                return;
            }
            // console.log(
            //     window?.Telegram?.WebApp?.initDataUnsafe
            // )
            // console.log(
            //     window?.Telegram?.WebApp
            // )
            const data = {
                name: name.value,
                time: time.value,
                guests: guests.value,
                place: places.find(item => item.value === place.value).value,
                query_id: window?.Telegram?.WebApp?.initDataUnsafe?.query_id || 1123,
                date: urlParams.get('date'),
            }

            alert('on data')

            // window.Telegram.WebApp.sendData(JSON.stringify(data));


            // axios.post('http://localhost:8000/web-data', {
            //     ...data
            // })

            fetch('http://localhost:8000/reserve', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                alert('on response')

                return response.json()

            }).then((response) => {
                alert('on response 2')

                let res = JSON.stringify(response)
                alert(res);
                console.log(res)
                return res;
            })


            alert('on end')

            // window.Telegram.WebApp.close();
        }

        window.Telegram.WebApp.MainButton.onClick(onSubmit);

        return {
            time,
            name,
            guests,
            place,
            errors,
            matchTime,
            places,
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

