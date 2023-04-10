<template>
    <v-form
        @submit.prevent="onSubmit"
        validate-on="submit"
        ref="form"
    >
        <FormHeader
            :home-team-logo="homeTeamLogo"
            :away-team-logo="awayTeamLogo"
            :home-team="homeTeam"
            :away-team="awayTeam"
        >
        </FormHeader>

        <v-card-item>
            <div class="mb-4">
                <h2 class="mb-4">Бронювання</h2>
            </div>
            <form-guests-number-input
                v-model="guests"
                :modelValue="guests"
                :guests-rules="guestsRules"
            >
            </form-guests-number-input>
            {{!window?.Telegram?.WebApp?.initDataUnsafe?.user?.username}}
            <form-person-input
                :phone-model-value:="phone"
                :name-model-value:name="name"
                :name-rules="nameRules"
                :phone-rules="phoneRules"
                :friend="isAdmin || !window?.Telegram?.WebApp?.initDataUnsafe?.user?.username"
                @update:phoneModelValue="phone = $event"
                @update:nameModelValue="name = $event"
            >
            </form-person-input>

            <form-time-input
                :modelValue="time"
                @update:modelValue="time = $event"
                :match-time-options="matchTimeOptions"
            >
            </form-time-input>

            <form-place-input
                v-if="!isAdmin"
                v-model="place"
                :modelValue="place"
            >
            </form-place-input>

            <div
                v-else
                class="d-flex flex-row flex-gap justify-space-between align-start mb-4"
            >
                <v-label class="w-33">Коментар</v-label>
                <v-text-field
                    v-model="adminComment"
                    class="w-75"
                >
                </v-text-field>
            </div>

            <div class="mb-4 d-flex" v-if="topMatch && !isAdmin">
                <v-checkbox
                    v-model="agreement"
                    label="Я розумію, що ця гра - матч підвищеного інтересу, і моя бронь буде анульована за 15 хвилин до стартового свистка, якщо я не повідомлю про запізнення!"
                    :rules="agreementRules"
                >
                </v-checkbox>
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
import { ref } from 'vue';
import { getUrlParam } from '../helpers/getUrlParams';
import FormHeader from "./FormHeader";
import FormPlaceInput from "./FormPlaceInput";
import FormGuestsNumberInput from "./FormGuestsNumberInput";
import FormPersonInput from "./FormPersonInput";
import FormTimeInput from "./FormTimeInput";

export default {
    name: "FormMatchday",
    components: {
        FormTimeInput,
        FormPersonInput,
        FormGuestsNumberInput,
        FormHeader,
        FormPlaceInput,
    },
    props: {
        prop: Number,
        guestsRules: Array,
        nameRules: Array,
        phoneRules: Array,
        agreementRules: Array,
        homeTeamLogo: String,
        homeTeam: String,
        awayTeamLogo: String,
        awayTeam: String,
        matchTimeOptions: Array,
    },
    emits: ['onSubmit'],
    setup(props, context) {
        // form
        const form = ref(null);
        const topMatch = getUrlParam('topMatch');
        let isAdmin = ref(getUrlParam('isAdmin') || false);
        let time = ref(props.matchTimeOptions[1]);
        let guests = ref(2);
        let place = ref('');
        let name = ref('Kaligula');
        let phone = ref('');
        let forFriend = ref(false);
        let adminComment = ref('');
        let agreement = ref(false);

        if(window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name.length) {
            name.value = window.Telegram?.WebApp?.initDataUnsafe?.user?.username
                || !window.Telegram?.WebApp?.initDataUnsafe?.user?.username
                || 'Kaligula';
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

        //submit
        async function onSubmit() {
            console.log('onSubmit')
            let valid = await form.value.validate();

            console.log(!valid.valid)
            if(!valid.valid) {
                console.log('invalid')

                setTimeout(() => {

                    form.value.resetValidation();
                }, 3000)
                return;
            }

            const dateArray = getUrlParam('date').split('.');
            const dateObj = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            const isoDateTime = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString();
            const data = {
                name: name.value,
                time: time.value,
                guests: guests.value,
                place: place.value,
                query_id: window?.Telegram?.WebApp?.initDataUnsafe?.query_id || 1123,
                date: isoDateTime,
                adminComment: adminComment.value,
                eventType: getUrlParam('eventType'),
                eventTitle: getUrlParam('eventTitle'),
                url: getUrlParam('url'),
            }

            window.Telegram?.WebApp?.close();
            context.emit('onSubmit', data);
        }

        return {
            form,
            time,
            name,
            phone,
            guests,
            place,
            agreement,
            adminComment,
            topMatch,
            forFriend,
            isAdmin,
            updateTime,
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
