<template>
  <div class="p-6 bg-white rounded-xl border shadow">
    <h2 class="text-2xl font-bold mb-4">
      📈 Bitcoin — Focus sur le TOP 1
    </h2>

    <highcharts :options="chartOptions" />
  </div>
</template>

<script setup>
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

const chartOptions = {
  chart: { type: 'line', backgroundColor: '#FFF8EE' },
  title: { text: null },
  xAxis: {
    categories: ['13/10', '14/10', '15/10', '16/10', '17/10', '18/10', '19/10', '20/10']
  },
  yAxis: {
    title: { text: '$US' }
  },
  series: [
    {
      name: 'Bitcoin',
      color: '#37b24d',
      data: [110000, 120000, 115000, 130000, 125000, 135000, 140000, 150000]
    }
  ]
}
</script>

<script>
export default {
  components: {
    highcharts: HighchartsVue.component
  }
}
</script>
