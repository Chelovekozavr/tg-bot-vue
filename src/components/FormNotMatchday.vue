<template>
    <v-form
        @submit.prevent="onSubmit"
        validate-on="submit"
        ref="form"
    >
        <v-time-picker></v-time-picker>
        <div class="xxx pa-6">
<v-label>Бронювання на 4 березня</v-label>
            <v-divider></v-divider>
            <v-btn v-for="item in 14" :disabled="item < 4" :key="item" class="mt-4 my-4">
                {{ `${item}` }}
            </v-btn>
        </div>
        <v-card-item>
            <v-divider class="mb-4"></v-divider>

            <div class="mb-4">
                <p class="text-h5 mb-4">Бронювання</p>
            </div>

            <v-divider class="my-4"></v-divider>

            <div class="d-flex flex-row flex-gap justify-space-between align-start mb-4">
                <v-label>Бронюю на</v-label>
                <div class="d-flex">
                    <date-picker
                        v-model:value="date"
                        placeholder="Оберіть дату"
                        :disabled-date="(date) => date < new Date() || date > new Date().setDate(new Date().getDate() + 30)"
                        default-panel="day"
                        format="MM-DD-YYYY"
                        class="mr-2"
                        :clearable="false"
                    >
                        <template v-slot:icon-calendar>
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/></svg>
                        </template>
                    </date-picker>
                    <v-select
                        v-model="time"
                        :items="timeOptions"
                    >

                    </v-select>
                </div>
            </div>

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

            <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-card-item>
    </v-form>
</template>

<script>
import { ref, computed } from 'vue';
import { places } from '../helpers/placeEnum';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/uk';
import FormPersonInput from "./FormPersonInput";
import FormPlaceInput from "./FormPlaceInput";
import FormGuestsNumberInput from "./FormGuestsNumberInput";

export default {
    name: "FormMatchday",
    components: {
        DatePicker,
        FormPersonInput,
        FormGuestsNumberInput,
        FormPlaceInput
    },
    props: {
        guestsRules: Array,
        nameRules: Array,
        phoneRules: Array,
    },
    emits: ['onSubmit'],
    setup(props, context) {
        const openingTime = '10:00';
        const closingTime = '22:00';

        //form
        let phone = ref('');
        const form = ref(null);
        let date = ref(new Date());
        let guests = ref(1);
        let place = ref(1);
        let name = ref('Kaligula');
        let time = ref(openingTime);

        if(window.Telegram?.WebApp?.initDataUnsafe) {
            name.value = window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula';
        }

        //options
        const timeOptions = computed(() => {
            const workingEndTime = new Date().setHours(+closingTime.split(':')[0], +closingTime.split(':')[1]);
            const timeGap = 30;
            let res = [{
                title: openingTime,
                value: openingTime,
            }];

            function getOptions(opt = openingTime) {
                let date = new Date().setHours(+opt.split(':')[0], +opt.split(':')[1], 0, 0);
                let datePlusGap = date + timeGap * 60000;

                if(workingEndTime > datePlusGap) {
                    let option = new Date(datePlusGap).toLocaleTimeString('UA-uk', {hour: '2-digit', minute:'2-digit'});
                    res.push(
                        {
                            title: option,
                            value: option,
                        }
                    );

                    getOptions(option);
                }
            }

            getOptions();

            return res;
        });

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
            timeOptions,
            name,
            guests,
            place,
            phone,
            places,
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

