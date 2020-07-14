import Vue from 'vue'
import Router from 'vue-router'
/* import Home from './views/Home.vue' */
import index from '@/components/index'
import daping from '@/components/daping'
import newporject from '@/components/newporject'
import login from '@/components/login'
import error from '@/components/404'
import error1 from '@/components/4041'
import test from '@/components/test'
import testt from '@/components/testt'
import homepage from '@/components/homepage'
import register from '@/components/register'
import projectlist from '@/components/projectlist'
import porjtI from '@/components/mainpage/PorjtI'
import dataV from '@/components/mainpage/dataV'
import addChildrenUse from '@/components/mainpage/addChildrenUse'
import deviceM from '@/components/mainpage/deviceManagement'
import areacontrol from '@/components/mainpage/areacontrol'
import video from '@/components/mainpage/video'
import plate from '@/components/plate'
import chinddata from '@/components/mainpage/chinddata'
import chinddat3 from '@/components/mainpage/chindtest3'
import zonglan from '@/components/mainpage/zonglan'
import store from './store.js'
Vue.use(Router)
    /* const originalPush = Router.prototype.push
    Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    } */
const router = new Router({
    routes: [{
            path: '/',
            name: 'homepage',
            component: homepage
        },
        {
            path: '/nn',
            name: 'testt',
            component: testt
        },
        {
            path: '/new',
            name: 'newporject',
            component: newporject
        },
        {
            path: '/projectlist',
            name: 'projectlist',
            component: projectlist,
            meta: { role: "admin", auth: true, keepAlive: true },
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            /* redirect: '/error', */
            meta: { role: ["admin", "user"], auth: true, keepAlive: true },
            redirect: to => {
                if (store.state.platedata === 3) {
                    return '/deviceM'
                } else {
                    return '/porjtl'
                }
            },
            children: [
                /* {
                                    path: '/plateI',
                                    name: '平台介绍',
                                    component: plateI,
                                    meta: { role: "admin", auth: true, keepAlive: true, typenub: [1] },
                                }, */
                {
                    path: '/porjtl',
                    name: '项目介绍',
                    component: porjtI,
                    meta: { role: "admin", auth: true, keepAlive: true, typenub: [1, 2] },
                },
                {
                    path: '/addChildrenUse',
                    name: '子用户管理',
                    component: addChildrenUse,
                    meta: { role: "admin", auth: true, keepAlive: true, typenub: [1, 2] },
                },
                {
                    path: '/deviceM',
                    name: '片区管理',
                    component: deviceM,
                    meta: { role: "admin", auth: true, keepAlive: true, typenub: [1, 2, 3] }
                },
                {
                    path: '/dataV',
                    name: '数据展示',
                    component: dataV,
                    meta: { role: ["admin"], auth: true, keepAlive: true, typenub: [1, 2, 3] }
                },

                {
                    path: '/areacontrol',
                    name: '片区控制',
                    component: areacontrol,
                    meta: { role: ["admin", "user"], auth: true, keepAlive: true, typenub: [1, 2, 3] }
                },
                {
                    path: '/chinddata',
                    name: '片区数据',
                    component: chinddata,
                    meta: { role: "user", auth: true, keepAlive: true, typenub: [1, 2, 3] }
                },
                {
                    path: '/chinddat3',
                    name: '片区视频',
                    component: chinddat3,
                    meta: { role: "user", auth: true, keepAlive: true, typenub: [1, 2, 3] }
                },
                {
                    path: '/video',
                    name: '视频监控',
                    component: video,
                    meta: { role: "admin", auth: true, keepAlive: true, typenub: [1, 2, 3] }
                },
                /*  {
                     path: '/zonglan',
                     name: 'zonglan',
                     component: zonglan,
                     meta: { role: "admin", auth: true, keepAlive: true, typenub: [1, 2, 3] }
                 }, */
            ]
        },
        {
            path: '/plate',
            name: 'plate',
            component: plate,
            meta: { role: "admin", auth: true, keepAlive: true }
        },

        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/test',
            name: 'test',
            component: test,
            meta: { role: "admin", auth: true, keepAlive: true }
        },
        {
            path: '/error',
            name: 'error',
            component: error,
        },
        {
            path: '/error1',
            name: 'error1',
            component: error1,
        },
        {
            path: '/dp',
            name: 'daping',
            component: daping,
        }
    ]
})

export default router