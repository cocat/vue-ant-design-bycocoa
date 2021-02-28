<template>
  <div>
    <a-form :form="form">
      <a-form-item
        label="付款密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!-- 这个输入框这里要做节流 -->
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.password,
              rules: [
                {
                  required: true,
                  min: 6,
                  message: '请输入付款密码,不得少于6位数字',
                },
              ],
            },
          ]"
          type="password"
          placeholder="请输入6位付款密码"
        />
      </a-form-item>

      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <!-- 按钮 -->
        <a-button @click="handleSubmit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      buttonItemLayout: {
        wrapperCol: { span: 14, offset: 4 },
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    },
  },
  methods: {
    //这里是真正的提交
    handleSubmit() {
      const { form, $store, step } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...step, ...values },
          });
          this.$emit("nextStep");
        }
      });
    },
    prevStep() {
      this.$emit("prevStep");
    },
  },
};
</script>

<style lang="less" scoped>
</style>
