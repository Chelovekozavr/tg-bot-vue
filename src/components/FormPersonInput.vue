<template>
    <div class="d-flex flex-row flex-gap justify-space-between align-start mb-6">
        <v-label>
            Стіл бронюю
        </v-label>
        <div v-if="!forFriend">
            <v-btn
                class="ma-2"
                :color="'primary'"
            >
                Для себе ({{ `@${name}` }})
            </v-btn>
            <v-btn @click="forFriend = true; name = ''">Для друга</v-btn>
        </div>
        <div v-else class="d-flex w-75">
            <v-text-field
                label="Ім'я"
                class="mr-2"
                v-model="name"
                :rules="nameRules"
                @input="updateName"
            ></v-text-field>
            <v-text-field
                v-maska:[options]
                label="Телефон"
                placeholder="(067)1927-88-88"
                v-model="phone"
                :rules="phoneRules"
                @input="updatePhone"
            >
            </v-text-field>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { vMaska } from "maska";

export default {
    name: "FormPersonInput",
    emits: ['update:modelValue:phone', 'update:modelValue:name'],
    props: {
        phoneRules: Array,
        nameRules: Array,
        isAdmin: Boolean,
    },
    setup(props, context) {
        let forFriend = ref(props.isAdmin);
        let phone = ref('');
        let name = ref('Kaligula');
        const options = reactive({
            mask: "(###)###-##-##",
        })


        if(window.Telegram?.WebApp?.initDataUnsafe?.user?.username.length) {
            name.value = window.Telegram?.WebApp?.initDataUnsafe?.user?.username;
        }


        function updateName() {
            context.emit('update:modelValue:name', name.value);
        }
        function updatePhone() {
            context.emit('update:modelValue:phone', phone.value);
        }

        return {
            forFriend,
            name,
            phone,
            options,
            vMaska,
            updateName,
            updatePhone,
        }
    }
}
</script>

<style scoped>

</style>