<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
// import { delete } from "vue/types/umd";
import SubMenu from "./SubMenu";
import { check } from "../utils/auth";
export default {
  props: {
    theme: {
      type: String,
      dafault: "dark",
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuList(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      selectedKeys: this.selectedKeysMap[this.$route.path],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // 拿到routes返回的数据
    getMenuList(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          // routes.forEach((item) => {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const listData = { ...item };
          delete listData.children;
          if (item.children && !item.hideChildrenInMenu) {
            listData.children = this.getMenuList(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            this.getMenuList(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(listData);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuList(item.children, [...parentKeys, item.path])
          );
        }
      }
      //   console.log(menuData);
      return menuData;
    },
  },
};
</script>
