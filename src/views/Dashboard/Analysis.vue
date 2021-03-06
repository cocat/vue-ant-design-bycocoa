<template>
  <div>
    
    <span class="analysis-title"></span>

    <div style="background: #ececec; padding: 20px">
      <a-card title="Analysis 分析页组件" :bordered="false" style="width: 100%">
        <Chart :option="chartOption" style="height: 400px" />
        <router-view></router-view>
      </a-card>
    </div>
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
            text: "ECharts 示例",
          },
          tooltip: {},
          //   legend: {
          //     data: ["销量"],
          //   },
          xAxis: {
            data: [
              "关键词A",
              "关键词B",
              "关键词C",
              "关键词D",
              "关键词E",
              "关键词F",
              "关键词G",
              "关键词H",
              "关键词I",
            ],
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

<style lang="less" scoped>
.ant-card-box {
  background-color: pink;
  width: 20px;
}
.ant-card {
  //   width: 46%;
  float: left;
}
</style>
