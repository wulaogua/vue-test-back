import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import VueIntro from 'vue-introjs';
import vueloading from 'vue-element-loading'
import 'intro.js/introjs.css';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './css/glob.css'
import 'default-passive-events'
import 'vue-orgchart/dist/style.min.css'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(VueIntro)
Vue.component("vueloading", vueloading);

axios.defaults.baseURL = "http://127.0.0.1:4000/api/"
    //请求头带上token
axios.interceptors.request.use(
    config => {
        if (window.sessionStorage.token) { //判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${window.sessionStorage.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//路由守卫
router.beforeEach(async(to, from, next) => {
    if (to.meta.auth != true) {
        return next();
    } else {
        //没有token
        const tokenStr = window.sessionStorage.getItem('token')
        if (!tokenStr) {
            this.$message.error('登陆验证过期，重新登陆')
            return next('/login');
        } else {
            if (!to.meta.role) {
                return next();
            } else {
                if (store.state.lore.length == 0) {
                    if (to.meta.role === store.state.lore) {
                        return next();
                    } else {
                        return next('/login');
                    }
                } else {
                    let metarole = to.meta.role;
                    let storelore = store.state.lore;
                    if (metarole.indexOf(storelore) >= 0) {
                        return next();
                    } else {
                        return next('/login');
                    }
                }
            }
        }
    }
})
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})