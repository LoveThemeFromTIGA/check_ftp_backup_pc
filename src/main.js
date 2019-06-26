import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import './styles/index.scss';
import App from './App.vue';
import router from './router';

Vue.use(ElementUI);
import axios from 'axios';
import settings from "./settings";



axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios; // 把对象挂载vue中
Vue.prototype.$settings = settings;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
