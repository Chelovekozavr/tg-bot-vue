<template>
    <div class="mb-4">
        <div class="calendar">
            <v-label
                v-for="day in week"
                :key="day"
                class="ma-2 calendar--item"
            >
                {{ day }}
            </v-label>
        </div>

        <div class="calendar">
            <v-btn
                v-for="(item, index) in dateArray"
                :key="`${index}-date-btn`"
                size="small"
                class="calendar--item"
                :style="{'background': selectedDate.getDate() === item.date.getDate() ? '#0C99E3' : undefined, 'border-color': '#fff'}"
                @click="$emit('update:selectedDate', item.date)"
                :disabled="item.disabled"
            >
                {{ formatDate(item.date) }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
    name: "FormDateInput",
    props: {
        selectedDate: Date,
    },
    emits: ['update:selectedDate'],
    setup(props, context) {
        let week = ref([
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
            'Нд',
        ]);
        const today = ref(new Date());
        let dateArray = computed(() => {
            const daysAvailableToReserve = 21;
            const dayOfWeek = today.value.getDay();
            const daysSinceMonday = (dayOfWeek + 7) % 7;
            let latestSunday = new Date(today.value - (daysSinceMonday * 24 * 60 * 60 * 1000));
            let res = [];

            do {
                let dateOption = new Date(latestSunday.setDate(latestSunday.getDate() + 1))
                res.push({
                    date: dateOption,
                    disabled: checkIfInThePast(dateOption),
            });
            } while (res.length < daysAvailableToReserve);

            function checkIfInThePast(date) {
                const todayZeroHours = new Date(today.value.setHours(0,0,0,0));

                return date.getTime() < todayZeroHours.getTime();
            }

            return res;
        });

        function formatDate(date) {
            return date.toLocaleString('uk-UA', { month: 'numeric', day: 'numeric'});
        }

        function updateDate(item) {
            context.emit('update:selected-date', item);
        }

        return {
            week,
            dateArray,
            updateDate,
            formatDate,
        }
    }
}
</script>

<style lang="scss" scoped>
.calendar {
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(7, 1fr);

    &--item {
        justify-self: center;
    }
}
</style>