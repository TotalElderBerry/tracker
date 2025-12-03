<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
    >
      <v-card
        max-width="500"
        min-height="600"
        variant="elevated"
      >
        <template v-slot:text>
            <div>
              <p class="text-subtitle-1 text-medium-emphasis mb-1">Exercise Name:</p>
              <v-text-field v-model="name" variant="outlined" density="compact" color="primary"></v-text-field>
            </div>
            <div>
              <p class="text-subtitle-1 text-medium-emphasis mb-1">Exercise Type:</p>
              <v-radio-group inline v-model="exercise">
                <v-radio label="Run" :value="1"></v-radio>
                <v-radio label="Lift" :value="2"></v-radio>
              </v-radio-group>
            </div>
            <div v-if="exercise == 2">
              <div class="text-center">
                <p class="text-subtitle-1 text-medium-emphasis mb-1">Sets</p>
                <div class="flex items-center justify-center  gap-2">
                  <v-btn @click="() => decrement('sets')" :icon="mdiMinus" variant="flat"></v-btn>
                  <p>{{ sets }}</p>
                  <v-btn @click="() => increment('sets')" :icon="mdiPlus" variant="flat"></v-btn>
                </div>
              </div>

              <div class="text-center">
                <p class="text-subtitle-1 text-medium-emphasis mb-1">Reps</p>
                <div class="flex items-center justify-center  gap-2">
                  <v-btn @click="() => decrement('reps')" :icon="mdiMinus" variant="flat"></v-btn>
                  <p>{{ reps }}</p>
                  <v-btn @click="() => increment('reps')" :icon="mdiPlus" variant="flat"></v-btn>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="text-center">
                <p class="text-subtitle-1 text-medium-emphasis mb-1">Distance</p>
                <div class="flex items-center justify-center  gap-2">
                  <v-btn @click="() => decrement('distance')" :icon="mdiMinus" variant="flat"></v-btn>
                  <p>{{distance}}</p>
                  <v-btn @click="() => increment('distance')" :icon="mdiPlus" variant="flat"></v-btn>
                </div>
              </div>
            </div>
        </template>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Save"
            @click="save"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { mdiPlus, mdiMinus } from '@mdi/js'

const dialog = defineModel();
const store = useStore();
const exercise = ref(1);
const distance = ref(1);
const reps = ref(1);
const sets = ref(1);
const name = ref("");
function increment(type) {
  switch (type) {
    case 'sets': 
      sets.value++;
      break;
    case 'reps':
      reps.value++;
      break;
    case 'distance':
      distance.value++;
      break;

  }
}

function decrement(type) {
  switch (type) {
    case 'sets': 
      if (sets.value > 0) sets.value--;
      break;
    case 'reps':
      if (reps.value > 0)reps.value--;
      break;
    case 'distance':
      if (distance.value > 0)distance.value--;
      break;

  }
}

function save() {
  const data = {
    id: Date.now(),
    name: name.value,
    details: []
  };

  if (exercise.value == 1) {
    data.details.push({
      'desc': `${distance.value} KM`
    })
  } else {
    data.details.push({
      'desc': `${sets.value} Sets`
    })
    data.details.push({
      'desc': `${reps.value} Repetitions`
    })
  }
  
  
  dialog.value = false;
  setTimeout(() => {
    store.programs.unshift(data);
    reps.value = sets.value = distance.value = 1;
    name.value = "";
  }, 100);
}
</script>

<style lang="css" scoped>

</style>