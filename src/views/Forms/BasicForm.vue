<template>
  <!-- 面包屑 -->
  <a-form :layout="formLayout" :form="form">
    <div class="page-header">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <span>表单</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item> 基础表单 </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <a-card>
      <!-- 表单 -->
      <!-- 这里是排列方式 horizontal Vertical  Inline -->
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="vertical"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal"> Horizontal </a-radio-button>
          <a-radio-button value="vertical"> Vertical </a-radio-button>
          <a-radio-button value="inline"> Inline </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <!-- field A -->
      <a-form-item
        label="FieldA"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'FieldA',
            {
              initialValue: FieldA,
              rules: [{ required: true, min: 6, message: '必须大于5个字符' }],
            },
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <!-- Field B -->
      <a-form-item
        label="FieldB"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['FieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit()"> Submit </a-button>
      </a-form-item>
    </a-card>
  </a-form>
</template>



<script>
// import { set } from "vue/types/umd";
export default {
  data() {
    //当组件数据更新后会自动更新
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      FieldA: "hello",
      FieldB: "",
      //   validateStatus: "",
      //   fieldAStatus: "",
      //   fieldAHelp: "",
    };
  },
  //   watch: {
  //     FieldA(val) {
  //       if (val.length <= 5) {
  //         this.fieldAStatus = "error";
  //         this.fieldAHelp = "必须大于5个字符";
  //       } else {
  //         this.fieldAStatus = "";
  //         this.fieldAHelp = "";
  //       }
  //     },
  //   },

  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({ FieldA: "hello world" });
    }, 3000);
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.FieldA = values.FieldA;
          Object.assign(this, values);
        }
      });
      //   if (this.FieldA.length <= 5) {
      //     this.fieldAStatus = "error";
      //     this.fieldAHelp = "必须大于5个字符";
      //   } else {
      //     console.log({
      //       fieldA: this.FieldA,
      //     });
      //   }
    },
  },
};
</script>

<style scoped>
.page-header {
  margin: 10px 0 10px 0px;
}
/* .ant-form-horizontal {
  margin-left: 0;
  padding: 0;
}
.ant-card-body {
  margin: 0;
} */
</style>