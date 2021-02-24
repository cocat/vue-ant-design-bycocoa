<template>
  <div>
    index
    <Step1 :formData="form"></Step1>
    <Step2 />
    <Step3 />
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
};
</script>

<style lang="less">
</style>
