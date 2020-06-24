import '@/style/global.scss'
import '@/style/table1.scss'

import Vue from 'vue'
Vue.config.productionTip = false

import '@/WindowGlobals.js'

import 'view-design/dist/styles/iview.css'
import ViewDesign from 'view-design'
Vue.use(ViewDesign)

import '@/hdl-iview/main.js'
import '@/filter.js'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes/index.js'
const router = new VueRouter({ routes })

import App from './App.vue'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
