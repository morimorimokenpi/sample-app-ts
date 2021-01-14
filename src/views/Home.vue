<template>
  <div class="home">
    <p>ホーム画面</p>
    <p><router-link to="sign-in">サインイン</router-link></p>
    <p><button @click="calendar">カレンダー</button></p>
    <p><button @click="profile">プロフィール</button></p>
    <p><button @click="share">共有</button></p>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(prop, context) {
    const calendar = () => {
      // this.$routerでもいける
      context.root.$router.push(
        {
          name: 'calendar',
          params: { type: { hoge: 123, fuga: 'xyz' } } as {},
        }, // ルート定義に記載した「path」を指定

        // 空の関数定義を行うと警告が出るので、警告を抑止。
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}, // 2番目の引数は、画面遷移成功時にyp日出されるコールバック関数。

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}, // 3番目の引数は、画面遷移が中断された際に呼び出されるコールバック関数。
      );
    };

    const profile = () => {
      context.root.$router.push(
        'profile',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
      );
    };

    const share = () => {
      context.root.$router.push(
        'share',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
      );
    };

    return {
      calendar,
      profile,
      share,
    };
  },
});
</script>
