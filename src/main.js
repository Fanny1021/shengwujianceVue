// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import 'babel-polyfill'
import Es6Promise  from 'es6-promise'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router/index'
import './global/filter_api'
import {initMenu} from "./global/menu"
import store from "./store/index"
import axios from 'axios'
import api from './axios/api/index'
import QS from 'qs'
// import VueRouter from 'vue-router';
// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// };
Vue.use(ElementUI);
// Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$api=api;
Vue.prototype.$store=store;
Vue.prototype.$QS=QS;
Vue.config.productionTip=false;
Es6Promise.polyfill();
router.beforeEach((to, from, next)=> {
    if (to.name == 'Login') {
      next();
      return;
    }
    var name = store.state.user.name;
  if (name != '未登录') {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}})
      } else {
        next();
      }
    } else {
      initMenu(router, store);
      next();
    }
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<app/>'
});

