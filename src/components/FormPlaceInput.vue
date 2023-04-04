<template>
    <div class="d-flex flex-row flex-gap justify-space-between align-start mb-4">
        <div class="w-50">
            <v-label class="mb-2">Побажання по розміщенню</v-label>
            <v-btn
                v-for="(item, index) in placeOptions"
                :key="`${index}-${item.value}-place`"
                class="ma-2"
                style="padding: 0 8px"
                :disabled="disabled"
                @click="updatePlace(item)"
            >
                {{ item.title }}
            </v-btn>
        </div>

        <div class="w-50 mt-8">
            <v-text-field
                v-model="placeComment"
                @input="updatePlaceComment"
                class="w-100"
                :disabled="disabled"
            >
                <div v-if="chips.length">
                    <v-chip
                        :disabled="disabled"
                        v-for="(item, index) in chips"
                        :key="`${item}-${index}-chip`"
                        closable
                        class="mr-2 mb-2"
                        @click:close="closeChip(item)"
                    >
                        {{ item.title }}
                    </v-chip>
                </div>

            </v-text-field>
        </div>
    </div>
</template>

<script>
import { places } from '../helpers/placeEnum';
import { ref } from 'vue';
export default {
    name: "FormPlaceInput",
    props: {
        disabled: Boolean
    },
    emits: ['update:modelValue'],
    setup(props, context) {
        let placeComment = ref('');
        let chips = ref([]);
        let placeOptions = ref(places);

        function updatePlace(e) {
            const index = placeOptions.value.findIndex(item => item.value === e.value);
            placeOptions.value.splice(index, 1);
            chips.value.push(e);
            emit();
        }

        function updatePlaceComment(e) {
            placeComment.value= e.target.value;
            emit();
        }

        function closeChip(e) {
            placeOptions.value.push(e);
            emit();
        }

        function emit() {
            const placesString = chips.value.map(function(item) {
                return item['title'];
            });
            context.emit('update:modelValue', `${placesString} ${placeComment.value}`);
        }

        return {
            placeOptions,
            chips,
            places,
            placeComment,
            updatePlace,
            updatePlaceComment,
            closeChip
        }
    }
}
</script>
