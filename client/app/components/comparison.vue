<template>
  <canvas ref="chartRef"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Register only what's needed
Chart.register(BarController, BarElement, CategoryScale, LinearScale)

const chartRef = ref(null)

onMounted(() => {
  new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: ['', ''],        // empty labels
      datasets: [
        {
          data: [10, 25],      // two bars
          backgroundColor: ['#735187', '#68596e'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }, // hide legend
        tooltip: { enabled: false }, // hide tooltip
      },
      scales: {
        x: {
          grid: { display: false }, // remove x axis lines
          ticks: { display: false }, // hide x ticks
        },
        y: {
          grid: { display: false }, // remove y axis lines
          ticks: { display: false }, // hide y ticks
        },
      },
    },
  })
})
</script>
