import Vue from 'vue'
import VueRouter from 'vue-router'

//routes路由控件
import routes from './config/routes'
//store对接后台传来用户数据进行交互
import store from './store/index'
import components from './components/' //加载公共组件

import './css/common.css'
import './less/common.less'

//每个页面都引入这个组件
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})

Vue.use(VueRouter)

const router = new VueRouter({
    routes //引入路由控件
})
//router.beforeEach 路由的一个钩子，to,from,next
router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta //需要验证是否需要登录才能访问，ture为需要，false为不需要
    var isLogin = Boolean(store.state.user.id) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

new Vue({store, router}).$mount('#app')