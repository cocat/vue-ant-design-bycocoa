<template>
  <!-- <div style="background: #ececec; padding: 20px"> -->
  <div>
    <div class="page-header">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <span>表单</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item> 分布表单 </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-card>
      <div class="content">
        <div class="content">
          <step1 v-if="currentTab === 0" @nextStep="nextStep" />
          <step2
            v-if="currentTab === 1"
            @nextStep="nextStep"
            @prevStep="prevStep"
          />
          <step3
            v-if="currentTab === 2"
            @prevStep="prevStep"
            @finish="finish"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default {
  components: {
    Step1,
    Step2,
    Step3,
  },
  data() {
    return {
      currentTab: 0,
      // form
      form: null,
    };
  },
  methods: {
    // handler
    nextStep() {
      if (this.currentTab < 2) {
        this.currentTab += 1;
      }
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1;
      }
    },
    finish() {
      this.currentTab = 0;
    },
  },
};
</script>

<style lang="less">
.page-header {
  margin: 10px 0 10px 0px;
}
</style>
