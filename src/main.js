import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './style/main.scss';
import Vant from 'vant';
import 'vant/lib/index.css';

import moment from 'moment';
moment.locale('nl');
Vue.prototype.$moment = moment;

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
