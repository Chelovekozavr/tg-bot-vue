<template>
    <form action="submit" class="form">
        <h2>Бронювання</h2>
        <div>
            <div>
                <p><label for="date">Дата:</label></p>
                <input
                    type="date"
                    v-model="date"
                    id="date"
                    :min="minDate"
                    :max="maxDate"
                >

            </div>
        </div>
        <div>
            <p>На коли:</p>
            <div>
                <label for="16:00">16:00</label>
                <input
                    type="radio"
                    value="16:00"
                    v-model="time"
                    id="16:00"
                >
            </div>

            <div>
                <label for="17:00">17:00</label>
                <input
                    type="radio"
                    value="17:00"
                    v-model="time"
                    id="17:00"
                >
            </div>

            <div>
                <label for="18:00">18:00</label>
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
            <p><label for="guests">На скількох:</label></p>
            <div>
                <button>-</button>
                <input
                    id="guests"
                    type="number"
                    min="1"
                    step="1"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    v-model="guests"
                >
                <button>+</button>
            </div>
        </div>
        <div>
            <p>Побажання по розміщенню:</p>
            <div>
                <label for="bar">на барі</label>
                <input
                    type="radio"
                    value="bar"
                    v-model="place"
                    id="bar"
                >
            </div>

            <div>
                <label for="tribune">зал з трибуною,</label>
                <input
                    type="radio"
                    value="tribune"
                    v-model="place"
                    id="tribune"
                >
            </div>

            <div>
                <label for="far">дальній зал</label>
                <input
                    type="radio"
                    value="far"
                    v-model="place"
                    id="far"
                >
            </div>

            <div>
                <label for="round">круглий стіл</label>
                <input
                    type="radio"
                    value="round"
                    v-model="place"
                    id="round"
                >
            </div>

            <div>
                <label for="center">по центру залу</label>
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
        const date = ref('0');
        const time = ref('0');
        const name = ref('0');
        const guests = ref('0');
        const place = ref('0');

        // const today = new Date();
        // const maxDate = ref(today.setDate(today.getDate() + 30));

        const today = new Date();
        const maxDateObj = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const minDate = `${yyyy}-${mm}-${dd}`;
        const maxDate = `${maxDateObj.getFullYear()}-${String(maxDateObj.getMonth() + 1).padStart(2, '0')}-${String(maxDateObj.getDate()).padStart(2, '0')}`;

        return {
            date,
            time,
            name,
            guests,
            place,
            minDate,
            maxDate
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

