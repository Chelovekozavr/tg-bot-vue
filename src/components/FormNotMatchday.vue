<template>
    <v-form
        @submit.prevent="onSubmit"
        validate-on="submit"
        ref="form"
    >
        <v-card-item>
            <h1>Бронювання на {{ date.toLocaleString('uk-UA', { weekday: 'short', month: 'long', day: 'numeric'}) }}</h1>
            <form-date-input
                v-model:selected-date="date"
            >
            </form-date-input>
            <v-divider class="my-4"></v-divider>
            <form-time-picker-input
                :today-selected="todaySelected"
                :key="date"
                v-model:selected-time="time"
            >
            </form-time-picker-input>
            <form-person-input
                :modelValue:phone="phone"
                :modelValue:name="name"
                :name-rules="nameRules"
                :phone-rules="phoneRules"
                @update:modelValue:phone="phone = $event"
                @update:modelValue:name="name = $event"
            >
            </form-person-input>
            <form-guests-number-input
                v-model="guests"
                :modelValue="guests"
                :guests-rules="guestsRules"
            >
            </form-guests-number-input>

            <form-place-input
                v-model="place"
                :modelValue="place"
            >
            </form-place-input>

            <v-btn
                type="submit"
                block
                class="mt-2"
                color="primary"
            >
                Забронювати
            </v-btn>
        </v-card-item>
    </v-form>
</template>

<script>
import { ref, computed } from 'vue';
import { places } from '../helpers/placeEnum';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/uk';
import FormPersonInput from "./FormPersonInput";
import FormPlaceInput from "./FormPlaceInput";
import FormDateInput from "./FormDateInput"
import FormGuestsNumberInput from "./FormGuestsNumberInput";
import FormTimePickerInput from './FormTimePickerInput'

export default {
    name: "FormMatchday",
    components: {
        FormPersonInput,
        FormGuestsNumberInput,
        FormPlaceInput,
        FormDateInput,
        FormTimePickerInput,
    },
    props: {
        guestsRules: Array,
        nameRules: Array,
        phoneRules: Array,
    },
    emits: ['onSubmit'],
    setup(props, context) {
        //form
        let phone = ref('');
        const form = ref(null);
        let date = ref(new Date());
        let guests = ref(2);
        let place = ref(1);
        let name = ref('Kaligula');

        const hoursNow = ref(new Date().getHours());
        let todaySelected = computed(() => {
            return date.value.getDate() === new Date().getDate();
        });
        let time = ref(todaySelected.value ? `${hoursNow.value + 1}:00` : '19:00');

        if(window.Telegram?.WebApp?.initDataUnsafe) {
            name.value = window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula';
        }

        // submit
        async function onSubmit() {
            let valid = await form.value.validate();

            if(!valid.valid) {
                setTimeout(() => {

                    form.value.resetValidation();
                }, 3000)
                return;
            }

            const data = {
                name: name.value,
                time: time.value,
                guests: guests.value,
                place: places.find(item => item.value === place.value).value,
                query_id: window?.Telegram?.WebApp?.initDataUnsafe?.query_id || 1123,
                date: date.value.toLocaleString(['uk-UA'], {
                    year: 'numeric',
                    month:"2-digit",
                    day:"2-digit",
                }),
            }

            context.emit('onSubmit', data);
        }

        return {
            form,
            date,
            time,
            name,
            guests,
            place,
            phone,
            places,
            todaySelected,
            onSubmit
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/main.scss";

/deep/ .centered-input input {
    text-align: center
}
.input-number {
    -moz-appearance:textfield !important;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>

