<template>
    <form action="submit" className="form">
        <h2>Бронювання</h2>
        <h3>{{ getMatchName() }}</h3>
        <div>
            <p>На коли:</p>
            <div>
                <label htmlFor="16:00">16:00</label>
                <input
                    type="radio"
                    value="16:00"
                    v-model="time"
                    id="16:00"
                >
            </div>

            <div>
                <label htmlFor="17:00">17:00</label>
                <input
                    type="radio"
                    value="17:00"
                    v-model="time"
                    id="17:00"
                >
            </div>

            <div>
                <label htmlFor="18:00">18:00</label>
                <input
                    type="radio"
                    value="18:00"
                    v-model="time"
                    id="18:00"
                >
            </div>
        </div>
        <div>
            <p><label>Для кого:</label></p>
            <input
                id="name"
                type="text"
                v-model="name"
            >
        </div>
        <div>
            <p><label htmlFor="guests">На скількох:</label></p>
            <div>
                <button>-</button>
                <input
                    id="guests"
                    type="number"
                    min="1"
                    step="1"
                    onKeyPress="return event.charCode >= 48 && event.charCode <= 57"
                    v-model="guests"
                >
                <button>+</button>
            </div>
        </div>
        <div>
            <p>Побажання по розміщенню:</p>
            <div>
                <label htmlFor="bar">на барі</label>
                <input
                    type="radio"
                    value="bar"
                    v-model="place"
                    id="bar"
                >
            </div>

            <div>
                <label htmlFor="tribune">зал з трибуною,</label>
                <input
                    type="radio"
                    value="tribune"
                    v-model="place"
                    id="tribune"
                >
            </div>

            <div>
                <label htmlFor="far">дальній зал</label>
                <input
                    type="radio"
                    value="far"
                    v-model="place"
                    id="far"
                >
            </div>

            <div>
                <label htmlFor="round">круглий стіл</label>
                <input
                    type="radio"
                    value="round"
                    v-model="place"
                    id="round"
                >
            </div>

            <div>
                <label htmlFor="center">по центру залу</label>
                <input
                    type="radio"
                    value="center"
                    v-model="place"
                    id="center"
                >
            </div>

        </div>
    </form>
</template>

<script>
import { ref } from 'vue';


export default {
    name: "MatchdayForm",
    setup() {
        let time = ref('16:00');
        let name = ref(window?.Telegram?.WebApp?.initDataUnsafe?.user?.username);
        let guests = ref(1);
        let place = ref('bar');

        // onMounted(() => {
        //     const username = window?.Telegram?.WebApp?.initDataUnsafe?.user?.username;
        //
        //     if(username) {
        //         name = username;
        //     }
        // })

        function getMatchName() {
            let urlParams = new URLSearchParams(window.location.search);
            console.log(urlParams.has('matchName'));
            console.log(urlParams.get('matchName'));

            return urlParams.get('matchName');
        }

        return {
            time,
            name,
            guests,
            place,
            getMatchName
        }
    }
}
</script>

<style>
.form {

}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>

