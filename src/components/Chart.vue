<template>
  <div ref="chartDom"></div>
</template>


<script>
// import echarts from "echarts";
// 因为要在nodejs的环境下，所以用import引入
var echarts = require("echarts");

// import echarts from "echarts/lib/echarts";
// import "echarts/lib/chart/bar";
// import "echarts/lib/component/title";

//使用第三方的库
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";

export default {
  //父组件传过来的值
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    },
    // // 深度监听
    // handle(val) {
    //   this.chart.setOption(val);
    // },
    // deep: true,
  },
  //防抖 调用debounce
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(this.$refs.chartDom);
    addListener(this.$refs.chartDom, this.resize);

    // 指定图表的配置项和数据
  },
  beforeDestroyed() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
      console.log("更新");
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    },
  },
};
</script>