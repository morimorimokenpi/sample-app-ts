import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@/plugins/composition-api';

Vue.config.productionTip = false;

new Vue({
  // VueRouterのインスタンスを、Vueのインスタンス化時のオプションに指定することで、this.$routerでVue Routerのインスタンスにアクセスできる。
  router,

  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
