<template>
  <a-form layout="horizontal" :form="form">
    <a-form-item
      label="付款账号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        placeholder="请输入付款账号"
        v-decorator="[
          'payAccount',
          {
            initialValue: step.payAccount,
            rules: [{ required: true, message: '请输入付款账号' }],
          },
        ]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">下一步</a-button>
    </a-form-item>
  </a-form>
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
    handleSubmit() {
      //   const { form, $router, $store } = this;
      const { form, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({
            type: "form/savaStepFormData",
            payload: values,
          });
          //   $router.push("/form/step-form/confirm");
          this.$emit("nextStep");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
// .ant-form-horizontal {
//   margin-left: 0;
//   padding: 0;
// }
// input {
//   float: left;
// }
</style>
