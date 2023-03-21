<template>
    <div class="d-flex flex-row flex-gap justify-space-between mb-4">
        <v-label>Бронюю на</v-label>
        {{date}}
        {{time}}
        <div class="d-flex">
            <date-picker
                v-model:value="date"
                placeholder="Оберіть дату"
                :disabled-date="(date) => date < new Date() || date > new Date().setDate(new Date().getDate() + 30)"
                default-panel="day"
                format="MM-DD-YYYY"
                class="mr-2 w-50"
                :clearable="false"
                @input="updateDate"
            >
                <template v-slot:icon-calendar>
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/></svg>
                </template>
            </date-picker>
            <v-select
                class="w-50"
                v-model="time"
                :items="timeOptions"
                @input="updateTime"
            >

            </v-select>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/uk';
import {computed, ref} from "vue";

export default {
    name: "FormDateInput",
    emits: ['update:modelValue:date', 'update:modelValue:time'],
    components: {
        DatePicker,
    },
    setup(props, context) {
        const openingTime = '10:00';
        const closingTime = '22:00';
        let date = ref(new Date());
        let time = ref(openingTime);

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

        function updateDate() {
            context.emit('update:modelValue:date', date.value);
        }
        function updateTime() {
            context.emit('update:modelValue:time', time.value);
        }

        return {
            date,
            time,
            timeOptions,
            updateDate,
            updateTime,
        }
    }
}
</script>

<style scoped>

</style>