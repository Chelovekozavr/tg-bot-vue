<template>
    <div class="d-flex flex-row flex-gap justify-space-between align-content-center mb-4">
        <v-label class="mb-2">Плануємо бути о</v-label>
        <v-btn-toggle
            v-model="time"
        >
            <v-btn
                v-for="(item, index) in matchTimeOptions"
                :key="`${index}-${item}-time`"
                variant="outlined"
                :style="{'background': time === item ? '#0C99E3' : undefined, 'border-color': '#fff'}"
                @click="updateTime(item)"
            >
                {{ item }}
            </v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    name: "FormTimeInput",
    emits: ['update:modelValue'],
    props: {
        matchTimeOptions: Array
    },
    setup(props, context) {
        let time = ref(props.matchTimeOptions[1]);
        function updateTime(e) {
            time.value = e;
            context.emit('update:modelValue', time.value);
        }

        return {
            time,
            updateTime
        }
    }
}
</script>

<style scoped>

</style>