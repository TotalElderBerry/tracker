<template>
  <v-app>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify"
const store = useStore();

onMounted(() => {
  // console.log("Removing local storage data...");
  // remove('mainPrograms');
  const programs = JSON.parse(get('mainPrograms'));
  // console.log(programs);
  store.mainPrograms = programs ?? [];
})

const theme = useTheme()
const themeColor = 'dark'

theme.global.name.value = themeColor;

const classes = document.documentElement.classList;
classes.add(themeColor);

</script>