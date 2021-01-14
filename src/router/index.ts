import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from '@/views/Home.vue';
import CalendarComponent from '@/views/Calendar.vue';
import ProfileComponent from '@/views/Profile.vue';
import ShareComponent from '@/views/Share.vue';
import SignInComponent from '@/views/SignIn.vue';

Vue.use(VueRouter); // Vue Routerインスタンスをプラグイン化してる。プラグイン化することで、単一ファイルコンポーネント内で、Vue Routerのインスタンスに感嘆詞アクセスできるようになる。

const routes: Array<RouteConfig> = [
  {
    path: '/', // URLを指定。
    name: 'home', // ルート定義の名前であり、指定は必須ではない。画面遷移を行う際にpathかnameのどちらかを使用できる。
    component: HomeComponent, // ルートに対応する画面コンポーネントを指定。画面コンポーネントを使用するためにインポートしてる。
    meta: {
      title: 'home',
    },
  },
  {
    path: '/calendar/:type', // typeがパラメーター(動的ルートマッチング)
    name: 'calendar',
    component: CalendarComponent,
    props: true, // props: trueを指定することで、Calendarコンポーネントにプロパティに値が渡される。
    meta: {
      title: 'calendar',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent,
    meta: {
      title: 'profile',
    },
  },
  {
    path: '/share',
    name: 'share',
    component: ShareComponent,
    meta: {
      title: 'share',
    },
  },
  {
    path: 'sign-in',
    name: 'sign-in',
    component: SignInComponent,
    meta: {
      title: 'sign-in',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // VueCLIを使用する場合にはvue.config.jsで指定する。vue.config.jsでpublicPathに指定した値が、BASE_URLの反映される。
  routes, // ルート定義の配列を指定する
});

router.afterEach(to => {
  if (!to.meta.title) {
    return;
  }

  document.title = to.meta.title;
});

export default router;
