import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import About from "../views/About.vue";
import { notification } from 'ant-design-vue';
//第一种做法，单独渲染组件RenderRouterView，去占位
// import RenderRouterView from "../components/RenderRouterView";
import NotFound from "../views/User/404.vue";
import Forbiden from "../views/User/403.vue";

// import Step1 from "../views/Forms/StepForm/Step1.vue";
// import Step2 from "../views/Forms/StepForm/Step2.vue";
// import Step3 from "./Step3";

//引入nprogress
import Nprpgress from "nprogress";
import "nprogress/nprogress.css";

//使用lodash工具。。。findLast方法
import findLast from "lodash/findLast";
import { check, isLogin } from "../utils/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: "/user",
        hideInMenu: true,
        // component: RenderRouterView,
        // 第二种做法，render函数直接绑定router- view
        // component: { render: h => h('router-view') },
        name: "UserLayout",
        //userlayout样式引入,当然 里面也要放router-view，否则渲染不出来
        component: () =>
            import( /*webpackChunkName :"UserLayout"*/  "../layouts/UserLayout")
        ,
        children: [
            {
                path: "/user", redirect: "/user/login"
            },
            {
                path: "/user/login",
                name: "login",
                component: () =>
                    import(/* webpackChunkName: "user" */ "../views/User/Login")
            }
            ,
            {
                path: "/user/register",
                name: "register",
                component: () =>
                    import(/* webpackChunkName: "Register" */ "../views/User/Register.vue")
            }
        ]
    },
    {
        path: "/",
        meta: { authority: ['user', 'admin'] },
        component: () =>
            import(/* webpackChunkName: "layout" */ "../layouts/BasicLayoute.vue"),
        children: [
            //  dashboard
            {
                path: "/",
                redirect: "/dashboard/analysis"
            },
            {
                path: "/dashboard",
                name: "dashboard",
                meta: { icon: "dashboard", title: "仪表盘" },
                component: {
                    render: h => h("router-view")
                },
                // components: () =>
                //     import(/* webpackChunkName: "analysis" */ "../views/Dashboard/Analysis"),
                children: [{
                    path: "/dashboard/analysis",
                    meta: { title: "分析页" },
                    name: "analysis",
                    component: () =>
                        import(/* webpackChunkName: "analysis" */ "../views/Dashboard/Analysis")
                },
                {
                    path: "/dashboard/search58",
                    meta: { title: "搜索" },
                    name: "search58",
                    component: () =>
                        import(/* webpackChunkName: "search" */ "../views/Dashboard/Search.vue")
                }]
            },
            //form
            {
                path: "/form",
                name: "form",
                meta: { icon: "form", title: "表单", authority: ['admin'] },
                component: { render: h => h("router-view") },
                children: [
                    {
                        path: "/form/basic-form",
                        meta: { title: "基础表单" },
                        name: "basicform",
                        component: () =>
                            import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue")
                    },
                    {
                        path: "/form/step-form",
                        name: "stepform",
                        hideChildrenInMenu: true,
                        meta: { title: "分布表单" },
                        component:
                            () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/index.vue"),
                        // children: [
                        //     { path: '/form/step-form', redirect: "/form/step-form/info" },
                        //     {
                        //         path: '/form/step-form', name: "info",
                        //         component: Step1
                        //     },
                        //     {
                        //         path: '/form/step-form/confirm', name: "confirm",
                        //         component: Step2
                        //     },
                        //     {
                        //         path: '/form/step-form/result', name: "result",
                        //         component: () => import("../views/Forms/StepForm/Step3")
                        //     }
                        // ]
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        name: "404",
        component: NotFound,
        hideInMenu: true,
    },
    {
        path: "*/403",
        name: "403",
        component: Forbiden,
        hideInMenu: true,
    },

    {
        path: "/about",
        name: "About",
        hideInMenu: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About,
    }
];



const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});


router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
        Nprpgress.start();
    }
    const record = findLast(to.matched, record => record.meta.authority)
    if (record && !check(record.meta.authority)) {
        if (!isLogin() && to.path !== '/user/login') {
            next({
                path: "/user/login"
            })
        } else if (to.path !== '/403') {
            notification.error({
                message: '403',
                description:
                    '暂无权限，请联系管理员开通'
            });
            next({
                path: '/403'
            })
        }
        Nprpgress.done();
    }
    next();
})

router.afterEach(() => {
    Nprpgress.done();
})

export default router;
