<template>
  <div>
    Analysis 分析页组件
    <Chart :option="chartOption" style="height: 400px" />
    <router-view></router-view>
  </div>
</template>

<script>
import Chart from "../../components/Chart.vue";
import request from "../../utils/request";
// import axios from "axios";

export default {
  data() {
    return {
      chartOption: {},
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "api/dashboard/chart",
        methods: "get",
        params: { ID: 12345 },
      }).then((response) => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          legend: {
            data: ["销量"],
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data,
            },
          ],
        };
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Chart,
  },
};
</script>

<style lang="less">
</style>
