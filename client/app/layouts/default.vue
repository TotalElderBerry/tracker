<template>
  <div class="sm:hidden">
    <Appbar />
    <v-main>
      <v-container fluid class="container">
        <slot class="mt-8"/>
      </v-container>
    </v-main>
  </div>
</template>