<template>
    <v-form @submit.prevent="onSubmit" ref="form" lazy-validation>
        <FormHeader
            :home-team-logo="homeTeamLogo"
            :away-team-logo="awayTeamLogo"
        >
        </FormHeader>
        <v-card-item>
            <div class="mb-4">
                <p class="text-h6 mb-4">Бронювання</p>
            </div>

            <div>
                <v-text-field
                    v-model="name"
                    label="Для кого:"
                    :rules="nameRules"
                    required
                >
                </v-text-field>
            </div>

            <div>
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
                <p class="text-body-2 mb-2">На коли:</p>
                <v-btn-toggle v-model="toggle_exclusive">
                    <v-btn
                        v-for="(item, index) in matchTimeOptions"
                        :key="`${index}-${item}-place`"
                        :color="time === item ? 'primary' : undefined"
                        variant="outlined"
                        @click="updateTime(item)"
                    >
                        {{ item }}
                    </v-btn>
                </v-btn-toggle>
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

            <div class="mb-4">
                <p
                    v-if="topMatch"
                    class="text-caption"
                >
                    * подія підвищеного інтересу. Будь ласка, приходьте заздалегідь. Всі бронвання згорають за 15 хвилин до гри
                </p>
            </div>

            <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-card-item>
    </v-form>
</template>

<script>
import { ref } from 'vue';
import { places } from '../helpers/placeEnum';
import { getUrlParam } from '../helpers/getUrlParams';
import FormHeader from "./FormHeader";

export default {
    name: "FormMatchday",
    components: {
        FormHeader
    },
    props: {
        prop: Number,
        guestsRules: Array,
        nameRules: Array,
        homeTeamLogo: String,
        awayTeamLogo: String,
        matchTimeOptions: Array,
    },
    emits: ['onSubmit'],
    setup(props, context) {
        // form
        const form = ref(null);
        const topMatch = getUrlParam('topMatch');
        let time = ref(props.matchTimeOptions[0]);
        let guests = ref(1);
        let place = ref(1);
        let name = ref('Kaligula');

        if(window.Telegram?.WebApp?.initDataUnsafe) {
            name.value = window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'Kaligula';
        }

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
        function updateTime(e) {
            time.value = e;
        }
        function updatePlace(e) {
            place.value = e;
        }

        //submit
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
                date: getUrlParam('date'),
            }

            context.emit('onSubmit', data);
        }

        return {
            form,
            time,
            name,
            guests,
            place,
            topMatch,
            places,
            updateTime,
            updatePlace,
            updateGuests,
            minusGuests,
            plusGuests,
            onSubmit
        }
    }
}
</script>
<style scoped>
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
