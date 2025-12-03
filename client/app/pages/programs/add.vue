<template>
    <div>
        <v-card
            max-width="800"
            min-height="600"
            variant="flat"
        >
            <template v-slot:title>
              
            </template>
    
            <template v-slot:text>
              <div class="flex flex-col gap-2">
                <div>
                  <p class="text-subtitle-1 text-medium-emphasis mb-2">Select days: </p>
                  <div class="flex gap-2 my-2 overflow-x-auto">
                    <v-btn
                      v-for="(d, i) in days"
                      :key="i"
                      @click="toggleDay(d)"
                      size="small"
                      class="flex flex-col items-center justify-center"
                      color="primary"
                      :variant="selectedDays.some(s => s.short === d.short) ? 'elevated' : 'outlined'"

                    >
                      <p class="text-xs">{{ d.short }}</p>
                    </v-btn>

                  </div>
                </div>
    
                <div>
                  <p class="text-subtitle-1 text-medium-emphasis mb-2">Program Name:</p>
                  <v-text-field v-model="data.programName" variant="outlined" density="compact" color="primary"></v-text-field>
                </div>
    
                <div>
                    <div class="flex justify-between items-center mb-2">
                      <p class="text-subtitle-1 text-medium-emphasis mb-2">Exercises:</p>
                      <v-btn size="small" color="primary" variant="tonal" @click="isModalOpen = true" :prepend-icon="mdiPlus">Add</v-btn>
                    </div>
                    <div class="flex flex-col gap-2">
                        <v-slide-y-transition group>
                          <v-card v-for="p in store.programs" :key="p.id" variant="flat" color="primary">
                            <template v-slot:title>{{ p.name }}</template>
                            <template v-slot:subtitle>
                              <p v-for="detail in p.details">{{ detail.desc }}</p>
                            </template>
                          </v-card>
                        </v-slide-y-transition>
                    </div>
                </div>
              </div>
    
            </template>
        </v-card>
        <div class="flex justify-center">
            <v-btn
                :icon="mdiPlus"
                color="primary"
                @click="save"
            />
        </div>
        <DialogAddProgram v-model="isModalOpen" />
    </div>
</template>

<script setup>
import { mdiPlus } from '@mdi/js'
const router = useRouter();

const days = [
  { short: 'Mon', long: 'Monday', sort: 1 },
  { short: 'Tue', long: 'Tuesday', sort: 2 },
  { short: 'Wed', long: 'Wednesday', sort: 3 },
  { short: 'Thu', long: 'Thursday', sort: 4 },
  { short: 'Fri', long: 'Friday', sort: 5 },
  { short: 'Sat', long: 'Saturday', sort: 6 },
  { short: 'Sun', long: 'Sunday', sort: 7 },
]
const isModalOpen = ref(false);
const store = useStore();
const selectedDays = ref([days[0]]);
const data = ref({
  id: Date.now(),
  days: [],
  programName: "",
  programs: []
});

function toggleDay(dayShort) {
  const index = selectedDays.value.indexOf(dayShort)
  if (index === -1) {
    selectedDays.value.push(dayShort) // select
  } else {
    if (selectedDays.value.length <= 1) return;
    selectedDays.value.splice(index, 1) // deselect
  }
}


function save() {
  selectedDays.value = selectedDays.value.sort((a, b) => a.sort - b.sort);
  data.value.days = selectedDays.value;
  data.value.programs = store.programs
  store.programs = []
  store.mainPrograms.unshift(data.value);
  set('mainPrograms', JSON.stringify(store.mainPrograms));
  router.push("/programs");
}
</script>