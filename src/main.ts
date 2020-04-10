import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
// @ts-ignore
import authentication from './authentication'

Vue.use(VueResource);
Vue.config.productionTip = false;
// authentication.initialize().then(_ => {
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
// })
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
