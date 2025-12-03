<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
    >
      <v-card
        max-width="500"
        min-height="200"
        variant="elevated"
      >
        <template v-slot:text>
            <div>
              <p class="text-subtitle-1 text-medium-emphasis mb-1">Goal Type:</p>
              <v-text-field v-model="type" placeholder="e.g. Reps, KM, Hours" variant="outlined" density="compact" color="primary"></v-text-field>
            </div>

            <div>
                <p class="text-subtitle-1 text-medium-emphasis mb-1">Goal Count:</p>
                <v-number-input
                    v-model="goal"
                    control-variant="default"
                    variant="outlined"
                    density="compact"
                ></v-number-input>
            </div>
            
        </template>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Save"
            @click="addGoal"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>

const dialog = defineModel();
const store = useStore();
const props = defineProps(['selectedExercise']);
const type = ref("");
const goal = ref(0);

function addGoal() {
    props.selectedExercise.goal = {
        total: goal.value,
        type: type.value,
        current: 0
    };
    const mainPrograms = JSON.parse(get('mainPrograms'));
    mainPrograms.forEach(mp => {
        const idx = mp.programs.findIndex(p => p.id == props.selectedExercise.id);
        if (idx !== -1) {
            mp.programs[idx] = props.selectedExercise;
        }
    });
    set('mainPrograms', JSON.stringify(mainPrograms));
    dialog.value = false;

}
</script>

<style lang="css" scoped>

</style>