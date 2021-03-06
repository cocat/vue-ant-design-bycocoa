// 入口文件
import Vue from "vue";
// import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
// import 'ant-design-vue/dist/antd.less';
import { Button, Layout, Icon, Drawer, Radio, Menu, Input, Form, Card, Breadcrumb, PageHeader, Tooltip, Steps ,Select} from 'ant-design-vue';
import Authorized from "./components/Authorized.vue";
import Auth from "./directives/auth";

// 注册Layout，或者用Vue.use 也可以
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component("Authorized", Authorized);


Vue.config.productionTip = false;

// Vue.use(Antd);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Auth);
Vue.use(Input);
Vue.use(Form);
Vue.use(Card);
Vue.use(Breadcrumb);
Vue.use(PageHeader);
Vue.use(Tooltip);
Vue.use(Steps);
Vue.use(Select);



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
