<template>
  <div>
    <h1 class="mb-4">Programs</h1>

    <v-slide-y-transition group>
      <v-card
        v-for="item in programs"
        :key="item.id"
        variant="flat"
        color="primary"
        elevation="0"
        class="my-2"
      >
        <v-list-item class="px-4" height="40">
          <template v-slot:title> <p class="text-wrap !text-3xl font-bold me-4 my-1">{{ item.title }}</p> </template>

          <template v-slot:append>
            <v-btn
              :to="`/programs/${item.id}`"
              text="View Program"
              variant="outlined"
              size="small"
            ></v-btn>
          </template>
        </v-list-item>

        <template v-slot:subtitle>{{ item.subtitle }}</template>
        <v-card-text>
          <p class="font-light">{{ item.programs.length }} Exercises</p>
        </v-card-text>
      </v-card>
    </v-slide-y-transition>

    <v-fab
      :icon="mdiPlus"
      color="primary"
      class="position-absolute bottom-4 right-4"
      to="/programs/add"
    />
  </div>
</template>

<script setup>
import { mdiPlus } from '@mdi/js'
import { ref, nextTick } from 'vue'
const store = useStore();

const programs = ref([])

onMounted(() => {
  const storedPrograms = store.mainPrograms;
  programs.value = storedPrograms.map(program => {
    const days = program.days.map(p => p.long).join(",");
    return {
      id: program.id ?? Date.now(),
      subtitle: days,
      title: program.programName,
      programs: program.programs
    }
  })
})

function add() {
  const newItem = {
    id: Date.now(),
    title: 'Pull',
    subtitle: 'Tuesday',
    visible: false,
    programs: []
  }

  programs.value.unshift(newItem)

  // wait for DOM update, then trigger transition
  nextTick(() => {
    newItem.visible = true
  })
}
</script>
