<template>
    <div>
        <div class="absolute left-4 right-0 top-16 scrollbar-hidden">
          <h1>December</h1>
          <div class="mt-2 mb-8 flex gap-2 overflow-x-auto scrollbar-hidden">
            <Day
              v-for="(d, i) in days"
              :key="i"
              class="flex-shrink-0"
              :date="d"
              :today="i == 0 ? true : false"
            />
          </div>

          <div class="mr-4">
              <h2 class="font-semibold text-primary my-1">My Stats</h2>
              <div class="grid grid-cols-2 gap-2">
                  <v-card variant="tonal" class="bg-primary">
                    <template v-slot:title>Weight</template>
                    <template v-slot:subtitle>200</template>
                  </v-card>
                  <v-card variant="tonal" class="bg-primary">
                    <template v-slot:title>Lifted</template>
                    <template v-slot:subtitle>200</template>
                  </v-card>
              </div>

              <div class="flex items-center justify-between mt-6 my-1">
                  <h2 class="text-xl font-semibold text-primary">Today's Goals</h2>
                  <v-btn variant="text" color="primary" size="small" to="/programs">See Programs</v-btn>
              </div>
              <div class="flex flex-col">
                <div v-for="e in exercisesToday">
                  <v-card variant="tonal" class="bg-primary my-4" v-for="p in e.programs">
                      <template v-slot:title>
                        <div class="grid grid-cols-3 items-start">
                          <div class="col-span-1">
                            {{ p.name }}
                            <p class="text-xs font-medium text-caption" v-for="detail in p.details">{{ detail.desc }}</p>
                          </div>
                          <div class="col-span-2 ms-8">
                            <v-expand-transition>
                              <div v-if="p.goal">
                                <p class="text-xs">{{p.goal.current}}/{{ p.goal.total }} {{ p.goal.type }}</p>
                                <v-progress-linear :max="p.goal.total" :model-value="p.goal.current" color="purple-lighten-400" :height="12"></v-progress-linear>
                              </div>
                              <div v-else class="text-center">
                                <p>😿</p>
                                <p class="text-sm text-wrap">You don't have a goal for today</p>
                              </div>
                            </v-expand-transition>
                          </div>
                        </div>
                      </template>
                      <template v-slot:text>
                        <div class="flex justify-between items-start gap-2 mt-1">
                          <v-btn @click="() => addGoal(p)" class="flex-1" size="small" variant="flat" :append-icon="mdiFlagCheckered" :disabled="p.goal">Add Goal</v-btn>
                          <v-btn @click="() => addProgress(p)" class="" size="small" variant="flat" :append-icon="mdiPlus" :disabled="!p.goal">Add Progress</v-btn>
                        </div>
                      </template>
                  </v-card>
                </div>
              </div>
          </div>
        </div>
        <DialogAddGoal v-model="isGoalOpen" :selectedExercise="selectedExercise"/>
        <DialogAddProgress v-model="isProgressOpen" :selectedExercise="selectedExercise"/>
    </div>
</template>


<script setup>
import { mdiPlus, mdiFlagCheckered } from "@mdi/js"
import AddProgress from "~/components/dialog/add-progress.vue";
let days = ref([]);
const daysLabel = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const dayName = daysLabel[today.getDay()];
const store = useStore();
const exercisesToday = ref([]);
const isGoalOpen = ref(false);
const isProgressOpen = ref(false);
const selectedExercise = ref({});
onMounted(() => {
    days.value = generateWeek();
    getExercisesToday();
    console.log(store.mainPrograms)
    console.log(exercisesToday.value)
})

function getExercisesToday() {
  const programs = store.mainPrograms;
  exercisesToday.value = programs.filter(p => {
    const daysVal = p.days.map(d => d.long);
    return daysVal.includes(dayName)
  })
}

function generateWeek() {
  const week = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayNumber = date.getDate(); // Day of the month
    const shortDayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.

    week.push({
      dayNumber,
      shortDayName,
    });
  }

  return week;
}

function addGoal(p) {
  selectedExercise.value = p;
  isGoalOpen.value = true;
}

function addProgress(p) {
  selectedExercise.value = p;
  isProgressOpen.value = true;
}
</script>

<style>
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

/* Firefox */
.scrollbar-hidden {
    scrollbar-width: none;
}

/* IE and Edge */
.scrollbar-hidden {
    -ms-overflow-style: none;
}
</style>