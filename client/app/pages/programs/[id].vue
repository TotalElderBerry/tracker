<template>
    <div class="mx-4 my-2">
        <h1 class="text-2xl">{{ program.programName }}</h1>
        <p class="text-lg">{{ days }}</p>

        <div class="flex flex-col gap-2 mt-4">
            <v-card v-for="p in program.programs" :key="p.id" variant="flat" color="primary">
                <template v-slot:title>
                    <div class="flex justify-between items-center">
                        <p>
                            {{ p.name }}
                        </p>
                        <v-btn :icon="mdiSquareEditOutline" size="x-small" variant="flat"></v-btn>
                    </div>
                </template>
                <template v-slot:subtitle>
                    <p v-for="detail in p.details">{{ detail.desc }}</p>
                </template>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import { mdiSquareEditOutline } from '@mdi/js'

const route = useRoute();
const store = useStore();

const programID = route.params.id;
const program = ref({});
onMounted(() => {
    program.value = getProgramByID();
})

const days = computed(() => {
    if (program.value.days) {
        return program.value.days.map(d => d.long).join(", ");
    }
    return ""
});

function getProgramByID() {
    return store.mainPrograms.find(p => p.id == programID);
}
</script>