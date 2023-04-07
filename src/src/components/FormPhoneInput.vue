<template>
    <v-text-field
        v-maska:[options]
        label="Телефон"
        placeholder="(067)1927-88-88"
        v-model="phone"
        :rules="phoneRules"
    >
    </v-text-field>
</template>

<script>
import { reactive, ref } from "vue";
import { vMaska } from "maska";

export default {
    name: 'FormPhoneNumber',
    props: {
        phoneRules: Array,
    },
    setup() {
        let phone = ref('');
        const options = reactive({
            mask: "(###)###-##-##",
        })

        return {
            phone,
            options,
            vMaska
        }
    }
}
</script>
