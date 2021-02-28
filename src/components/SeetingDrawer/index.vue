<template>
  <div>
    <a-drawer
      title="风格设置"
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
        <h3 class="setting-drawer-index-title">整体风格定制</h3>

        <div class="menuTheme">
          <div class="menuThemePic">
            <template slot="title"> 暗色菜单风格 </template>
            <div
              class="setting-drawer-index-item"
              @click="handleMenuTheme('dark')"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
                alt="dark"
              />
              <div
                class="setting-drawer-index-selectIcon"
                v-if="navTheme === 'dark'"
              >
                <a-icon type="check" />
              </div>
            </div>
          </div>

          <div class="menuThemePic">
            <template slot="title"> 亮色菜单风格 </template>
            <div
              class="setting-drawer-index-item"
              @click="handleMenuTheme('light')"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
                alt="light"
              />
              <div
                class="setting-drawer-index-selectIcon"
                v-if="navTheme !== 'dark'"
              >
                <a-icon type="check" />
              </div>
            </div>
          </div>
        </div>

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
      navTheme: "dark",
      navLayout: "left",
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    },
    handleMenuTheme(theme) {
      if (theme == "dark") {
        this.navTheme = "dark";
        // console.log("dark");
        this.$router.push({
          query: { ...this.$route.query, navTheme: "dark" },
        });
      } else if (theme == "light") {
        this.navTheme = "light";
        // console.log("light");
        this.$router.push({
          query: { ...this.$route.query, navTheme: "light" },
        });
      }
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
.menuTheme {
  display: flex;
  .menuThemePic {
    margin-right: 10px;
  }
}
</style>
