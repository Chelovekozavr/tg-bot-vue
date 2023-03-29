<template>
    <div class="d-flex flex-row flex-gap justify-space-between align-start mb-6">
        <v-label class="mb-2 mr-10 w-50">Плануємо бути о</v-label>
        <v-text-field
            v-model="selectedTime"
            @blur="updateTime($event.target.value)"
            v-maska:[options]
            density="compact"
            class="time-picker w-10 mr-6"
            :hide-spin-buttons="true"
            type="string"
        >
            <template v-slot:prepend>
                <div class="d-flex flex-column time-picker__up">
                    <v-btn
                        letiant="text"
                        size="x-small"
                        type="button"
                        icon="mdi-arrow-up-bold"
                        @click="plusHour"
                    ></v-btn>
                    <v-btn
                        letiant="text"
                        size="x-small"
                        type="button"
                        icon="mdi-arrow-down-bold"
                        @click="minusHour"
                    ></v-btn>
                </div>
            </template>
            <template v-slot:append>
                <div class="d-flex flex-column time-picker__down">
                    <v-btn
                        letiant="text"
                        size="x-small"
                        type="button"
                        icon="mdi-arrow-up-bold"
                        @click="plusMinutes"
                    ></v-btn>
                    <v-btn
                        letiant="text"
                        size="x-small"
                        type="button"
                        icon="mdi-arrow-down-bold"
                        @click="minusMinutes"
                    ></v-btn>
                </div>
            </template>
        </v-text-field>
    </div>

</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue';
import { vMaska } from "maska";

export default {
    name: "FormTimePickerInput",
    props: {
        todaySelected: Boolean,
        parentTime: String,
    },
    emits: ['update:selectedTime', 'plus-day'],
    setup(props, context) {
        const hoursNow = ref(new Date().getHours());
        const timeOpening = ref('12:00');
        const defaultEarlyTime = ref(getDefaultEarlyTime());
        const timeClosing = ref('22:00');
        const defaultLateTime = ref(getDefaultLateTime());
        const options = reactive({
            mask: "##:##",
        });
        let selectedTime = ref('19:00');

        function getDefaultEarlyTime() {
            const openingTimeArray = timeOpening.value.split(':');

            return `${openingTimeArray[0]}:00`;
        }
        function getDefaultLateTime() {
            const closingTimeArray = timeClosing.value.split(':');

            return `${+closingTimeArray[0] - 1}:30`;
        }
        function roundToNearestHalfHour() {
            let d = new Date();
            let minutes = d.getMinutes();
            let halfHour = 30;

            if (minutes < halfHour) {
                d.setMinutes(halfHour);
            } else if (minutes >= halfHour) {
                d.setMinutes(0);
                d.setHours(d.getHours() + 1);
            }

            if (d.getMinutes() !== 0 && d.getMinutes() !== 30) {
                d.setMinutes(30);
            }

            let hours = d.getHours();
            let formattedHours = (hours < 10) ? "0" + hours : hours;
            let formattedMinutes = (d.getMinutes() === 0) ? "00" : "30";

            return formattedHours + ":" + formattedMinutes;
        }
        function plusHour() {
            let timeArray = selectedTime.value.split(':');
            let hours = +timeArray[0];
            let hourClosing = +timeClosing.value.split(':')[0];

            if(hours >= hourClosing) {
                return;
            } else {
                selectedTime.value = `${hours+1}:${timeArray[1]}`
            }
        }

        function minusHour() {
            let timeArray = selectedTime.value.split(':');
            let hours = +timeArray[0];
            let hourOpening = +timeOpening.value.split(':')[0];

            if(hours <= hourOpening) {
                return;
            } else if(props.todaySelected && +hours - 1 <= +new Date().getHours()) {

                return;
            } else {
                selectedTime.value = `${hours-1}:${timeArray[1]}`
            }
        }

        function plusMinutes() {
            let timeArray = selectedTime.value.split(':');
            let hours = +timeArray[0];
            let minutes = +timeArray[1];
            let hourClosing = timeClosing.value.split(':')[0];
            if(+hours >= +hourClosing) {
                return;
            } else {
                if(minutes === 0) {
                    selectedTime.value = `${hours}:30`;
                } else {
                    selectedTime.value = `${hours + 1}:00`;
                }
            }
        }

        function minusMinutes() {
            let timeArray = selectedTime.value.split(':');
            let hours = +timeArray[0];
            let minutes = +timeArray[1];
            let hourOpening = timeOpening.value.split(':')[0];

            if(+hours <= +hourOpening) {
                return;
            } else if(props.todaySelected && props.todaySelected +hours - 2 <= +new Date().getHours()) {

                return;
            } else {
                if(minutes === 0) {
                    selectedTime.value = `${hours}:30`;
                } else {
                    selectedTime.value = `${hours - 1}:00`;
                }
            }
        }

        function updateTime(e) {
            let closingArray = timeClosing.value.split(':');
            let openingArray = timeOpening.value.split(':');
            const inputArray = e.split(':');
            const now = new Date();
            const closingDate = new Date().setHours(closingArray[0], closingArray[1]);
            const openingDate = new Date().setHours(openingArray[0], openingArray[1]);
            const inputDate = new Date().setHours(inputArray[0], inputArray[1]);

            if(props.todaySelected && new Date().getTime() >= new Date(now.getFullYear(), now.getMonth(), now.getDate(), inputArray[0], inputArray[1]).getTime()) {
                selectedTime.value = roundToNearestHalfHour();

                return;
            } else if(inputDate > closingDate) {
                selectedTime.value = defaultLateTime.value;

                return;
            } else if(inputDate < openingDate) {
                selectedTime.value = defaultEarlyTime.value;

                return;
            } else {
                if(+inputArray[1] >= 60 || +inputArray[1] < 15) {
                    selectedTime.value = `${inputArray[0]}:00`;

                    return;
                } else if (+inputArray[1] < 45) {
                    selectedTime.value = `${inputArray[0]}:30`;

                    return;
                } else {
                    selectedTime.value = `${+inputArray[0] + 1}:00`;

                    return;
                }
            }
        }

        watch(selectedTime, () => {
            context.emit('update:selectedTime', selectedTime.value);
        })

        onMounted(() => {
            if(props.todaySelected) {
                const timeSelectedArray = selectedTime.value.split(':');
                const timeClosingArray = timeClosing.value.split(':');
                const timeSelectedDate = new Date().setHours(timeSelectedArray[0], timeSelectedArray[1]);
                const closingDate = new Date().setHours(timeClosingArray[0], timeClosingArray[1]);

                if(timeSelectedDate > closingDate) {
                    context.emit('plus-day');
                } else if(timeSelectedDate < new Date().getTime()) {
                    selectedTime.value = `${hoursNow.value + 1}:00`;
                }
            }
        })

        return {
            vMaska,
            options,
            selectedTime,
            plusHour,
            minusHour,
            plusMinutes,
            minusMinutes,
            updateTime,
        }
    }
}
</script>

<style lang="scss" scoped>
.time-picker {
    position: relative;
    width: 70px;

    &__up {
        position: absolute;
        top: -10px;
        left: -20px;
    }

    &__down {
        position: absolute;
        top: -10px;
        right: -20px;
    }
}
</style>