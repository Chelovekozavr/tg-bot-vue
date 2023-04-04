<template>
    <v-form
        @submit.prevent="onSubmit"
        validate-on="submit"
        ref="form"
    >
        <v-card-item>
            <h1>edit</h1>
            <h2>{{ isAdmin }}</h2>
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
                @plus-day="plusDay"
            >
            </form-time-picker-input>

            <form-person-input
                :modelValue:phone="phone"
                :modelValue:name="name"
                :name-rules="nameRules"
                :phone-rules="phoneRules"
                :is-admin="isAdmin"
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
                :disabled="isAdmin"
                :modelValue="place"
            >
            </form-place-input>

            <div
                class="d-flex flex-row flex-gap justify-space-between align-start mb-4"
            >
                <v-label class="w-33">Коментар</v-label>
                <v-text-field
                    v-model="adminComment"
                    class="w-75"
                >
                </v-text-field>
            </div>

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
import { ref, computed, onMounted } from 'vue';
import { places } from '../helpers/placeEnum';
import { getUrlParam } from '../helpers/getUrlParams';
import axios from "axios";
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
        onMounted(async() => {
            // const id = getUrlParam('id');
            const id = '642b08a60ce9eaa9088ccb23';
            await axios.post('http://localhost:8085/getReserve', { id }).then((response) => {
                console.log(response.data);
                return response.data;
            }).catch((err) => {
                console.log(err)
            })
        })
        //form
        let phone = ref('');
        const form = ref(null);
        let isAdmin = ref(getUrlParam('isAdmin') || true);
        let date = ref(new Date());
        let guests = ref(2);
        let place = ref(1);
        let name = ref('Kaligula');
        let adminComment = ref('');

        const hoursNow = ref(new Date().getHours());
        let todaySelected = computed(() => {
            return date.value.getDate() === new Date().getDate();
        });
        let time = ref(todaySelected.value ? `${hoursNow.value + 1}:00` : '19:00');

        if(window.Telegram?.WebApp?.initDataUnsafe) {
            name.value = window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula';
        }

        // submit

        function plusDay() {
            let nextDay = new Date();

            nextDay.setDate(nextDay.getDate() + 1);
            date.value = nextDay;

        }
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
                date: date.value.toISOString(),
            }

            context.emit('onSubmit', data);
            window.Telegram.WebApp.close();

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
            isAdmin,
            adminComment,
            plusDay,
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
