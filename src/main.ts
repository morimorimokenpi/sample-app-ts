import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueCompositionAPI from '@vue/composition-api';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

new Vue({
  router, // VueRouterのインスタンスを、Vueのインスタンス化時のオプションに指定することで、this.$routerでVue Routerのインスタンスにアクセスできる。
  store,
  render: h => h(App),
}).$mount('#app');
