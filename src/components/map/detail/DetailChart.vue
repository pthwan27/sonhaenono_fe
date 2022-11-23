<template>
  <div class="detail_chart">
    <div class="chart mb-2">
      <canvas ref="lineChart" :height="height" :width="width"></canvas>
    </div>
    <div class="detail_table">
      <detail-deal-table :deals="deal.deals"></detail-deal-table>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, registerables } from "chart.js";
import DetailDealTable from "./DetailDealTable";

ChartJS.register(...registerables);

let _chartElem = null;
let chartData = {
  labels: [],
  datasets: [
    {
      backgroundColor: "#f87979",
      data: [],
    },
  ],
};
let chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default {
  name: "DetailChart",
  components: { DetailDealTable },
  props: {
    width: {
      type: Number,
      default: 375,
    },
    height: {
      type: Number,
      default: 200,
    },
    deal: {
      type: Object,
      default: null,
    },
  },
  watch: {
    deal: {
      deep: true,
      handler(value) {
        if (value) {
          let data = this.averageFiltering(value.averages);
          this.chartUpdate(data[0], data[1]);
          _chartElem.update();
        }
      },
    },
  },
  methods: {
    averageFiltering(averages = []) {
      let labels = [];
      let averageDeals = [];

      averages.forEach((avg) => {
        labels.push(avg.dealYear);
        averageDeals.push(avg.averageDeal);
      });

      return [labels, averageDeals];
    },
    chartUpdate(labels, averages) {
      chartData.labels = labels;
      chartData.datasets[0].data = averages;
    },
    chartCreate() {
      _chartElem = new ChartJS(this.$refs.lineChart, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    },
    chartDestroy() {
      if (_chartElem) {
        _chartElem.destroy();
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      let data = this.averageFiltering(this.deal.averages);
      this.chartUpdate(data[0], data[1]);
      this.chartCreate();
    });
  },
  destroyed() {
    this.chartDestroy();
  },
};
</script>

<style scoped>
.detail_chart {
  border-top: 1px solid #fff;
  padding: 1rem 1rem;
}
</style>
