<template>
    <v-form @submit.prevent="onSubmit" ref="form" lazy-validation>
        <v-divider class="mb-4"></v-divider>

        <div class="mb-4">
            <p class="text-h5 mb-4">Бронювання</p>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="mb-4">
            <p class="text-body-2 mb-2">На коли:</p>

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

        <div class="mb-4">
            <v-text-field
                v-model="name"
                label="Для кого:"
                :rules="nameRules"
                required
            >
            </v-text-field>
        </div>

        <div class="mb-4">
            <v-text-field
                v-model="guests"
                :rules="guestsRules"
                label="На скількох:"
                style="text-align: center"
                class="centered-input input-number"
                type="number"
                ref="guestsField"
                :hide-spin-buttons="true"
            >
                <template v-slot:prepend>
                    <v-btn
                        type="button"
                        icon="mdi-minus"
                        @click="minusGuests"
                        @blur="$refs.guestsField.validate()"
                    ></v-btn>
                </template>
                <template v-slot:append>
                    <v-btn
                        type="button"
                        icon="mdi-plus"
                        @click="plusGuests"
                        @blur="$refs.guestsField.validate()"
                    ></v-btn>
                </template>
            </v-text-field>
        </div>

        <div class="mb-4">
            <p class="text-body-2 mb-2">Побажання по розміщенню:</p>
            <v-btn
                v-for="(item, index) in places"
                :key="`${index}-${item.value}-place`"
                class="ma-2"
                rounded
                :color="place === item.value ? 'primary' : undefined"
                @click="updatePlace(item.value)"
            >
                {{ item.titleUa }}
            </v-btn>
        </div>

        <v-btn type="submit" block class="mt-2">Submit</v-btn>

    </v-form>
</template>

<script>
import { ref, computed } from 'vue';
import { places } from '../helpers/placeEnum';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/uk';

export default {
    name: "FormMatchday",
    components: {
        DatePicker
    },
    props: {
        guestsRules: Array,
        nameRules: Array,
    },
    emits: ['onSubmit'],
    setup(props, context) {
        const openingTime = '10:00';
        const closingTime = '22:00';

        //form
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

        //onChange
        function minusGuests() {
            if(guests.value <=1) {
                return;
            }
            guests.value--;
        }
        function plusGuests() {
            if(guests.value >= 21) {

                return;
            }
            guests.value++;
        }
        function updateGuests(e) {
            guests.value = e.target.value;
        }
        function updatePlace(e) {
            place.value = e;
        }

        // submit
        async function onSubmit() {
            let valid = await form.value.validate();

            if(!valid.valid) {
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
            places,
            updatePlace,
            updateGuests,
            minusGuests,
            plusGuests,
            onSubmit
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/datepicker";
@import "../css/main.scss";
.icon {
    color: #fff;
}
/deep/ .mx-input {
    height: 56px;
    background: #292929;
    transition: .3s;
    font-size: 16px;
    border: none;
    border-bottom: .5px solid rgba(#fff, .4);
    border-radius: 5px 5px 0 0;
    color: #fff;
    &:hover {
        background: #3F3F3F;
        border-bottom: .5px solid #fff;
    }
    .mx-icon-calendar {
        color: #fff
    }
}
</style>

