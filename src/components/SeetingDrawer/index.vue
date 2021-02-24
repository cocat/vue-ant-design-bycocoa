<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div class="radioSetting">
        <h3>整体风格定制</h3>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="(e) => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark"> 黑色 </a-radio>
          <a-radio value="light"> 白色 </a-radio>
        </a-radio-group>
        <h3>方向</h3>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="(e) => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left"> 左侧 </a-radio>
          <a-radio value="top"> 顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      //   navTheme: "dark",
      //   navLayout: "left",
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    },
  },
};
</script>

<style lang="less">
.handle {
  position: absolute;
  width: 48px;
  height: 48px;
  color: white;
  background-color: #1890ff;
  top: 240px;
  right: 256px;
  font-size: 20px;
  line-height: 48px;
  text-align: center;
}
</style>
