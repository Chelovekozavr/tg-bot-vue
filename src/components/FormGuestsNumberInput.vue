<template>
    <div class="d-flex flex-row flex-gap justify-space-between align-start mb-6">
        <v-label class="text-wrap mr-20 w-50">
            Бронюю стіл на кількість місць
        </v-label>
        <v-text-field
            v-model="guests"
            :rules="guestsRules"
            style="text-align: center"
            class="centered-input input-number w-50"
            type="number"
            ref="guestsField"
            :hide-spin-buttons="true"
            single-line
            @input="updateGuests"
        >
            <template v-slot:prepend>
                <v-btn
                    type="button"
                    class="icon-button"
                    style="height: 40px; width: 40px"
                    icon="mdi-minus"
                    @click="minusGuests"
                    @blur="$refs.guestsField.validate()"
                ></v-btn>
            </template>
            <template v-slot:append>
                <v-btn
                    type="button"
                    class="icon-button"
                    style="height: 40px; width: 40px"
                    icon="mdi-plus"
                    @click="plusGuests"
                    @blur="$refs.guestsField.validate()"
                ></v-btn>
            </template>
        </v-text-field>
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    name: "FormGuestsNumberInput",
    emits: ['update:modelValue'],
    props: {
        guestsRules: Array,
    },
    setup(props, context) {
        let guests = ref(2);
        function minusGuests() {
            if(guests.value <=1) {
                return;
            }
            guests.value--;
            emit();
        }
        function plusGuests() {
            if(guests.value >= 21) {

                return;
            }
            guests.value++;
            emit();
        }
        function updateGuests(e) {
            guests.value = e.target.value;
            emit();
        }
        function emit() {
            context.emit('update:modelValue', guests.value);
        }

        return {
            guests,
            minusGuests,
            plusGuests,
            updateGuests,
        }
    }
}
</script>
