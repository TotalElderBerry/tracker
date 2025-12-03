<template>
    <div class="w-12 h-12 rounded-full flex flex-col items-center justify-center border-1 border-purple-200" :class="{'bg-primary': props.today}">
        <p class="text-xs">{{props.date.dayNumber}}</p>
        <p class="text-xs font-semibold ">{{props.date.shortDayName}}</p>
    </div>
</template>

<script setup>
const props = defineProps(['date', 'today']);

</script>