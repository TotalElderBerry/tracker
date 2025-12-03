<template>
    <v-app-bar :elevation="2" height="50">
        <template v-slot:prepend>
            <v-btn :icon="mdiHome" to="/"></v-btn>
        </template>
        <template v-slot:append>
            <v-btn :icon="mdiCog" color="secondary" @click="openSettings"></v-btn>
        </template>
    </v-app-bar>
</template>

<script setup>
import { mdiCog, mdiHome } from '@mdi/js'
import { useTheme } from 'vuetify';

const theme = useTheme();
let flag = true;
function openSettings() {
    flag = !flag;
    theme.global.name.value = flag ? 'dark' : 'light';
}
</script>