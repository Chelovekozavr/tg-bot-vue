<template>
    <v-app>
        <Form></Form>
    </v-app>
</template>

<script>
import Form from "./components/Form";
export default {
    name: 'App',
    components: {
        Form,
    }
}
</script>
<style>
@import "css/main.scss";
</style>
