import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import EventBus from './event-bus'
import VueRouter from 'vue-router'
import {routes} from './routes.js'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getCounter(count){
      EventBus.$emit("count",count)
    }
  }
})
Vue.use(VueRouter)
const router = new VueRouter({
  routes : routes,
  mode : "history",
  scrollBehavior(to,from,savedPosition){
    if(to.hash){
      return{
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
