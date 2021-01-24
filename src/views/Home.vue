<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <v-row class="py-12" align="center" justify="center">
        <span class="font-weight-thin title" v-text="`${today.year}/`" />
        <span class="pl-2 display-1" v-text="`${today.month}/${today.day}`" />
        <v-chip
          class="ml-2 pt-0 title"
          color="pink"
          text-color="white"
          v-text="displayWeekday"
        />
      </v-row>
      <div v-for="(event, index) in filteredEvents" :key="index">
        <v-chip
          class="mt-2"
          :color="getEventColor(event)"
          text-color="white"
          label
          v-text="event.name"
        />
      </div>
      <v-divider class="my-4" />
      <v-timeline v-if="displayTimeline" class="mb-12">
        <v-timeline-item
          v-for="(event, index) in filteredEventsHasTime"
          :key="index"
          class="text-left"
          right
          :color="getEventColor(event)"
        >
          <template v-slot:opp0site>
            <span v-text="event.startTime" />
          </template>
          <span class="pl-4" v-text="event.name" />
          <v-row align="center" justify="center">
            <v-switch
              v-for="(sharedUser, index) in sharedUsers"
              :key="index"
              v-model="sharedUser.themeColor"
              class="ml-4 pt-0"
              :label="sharedUser.nickname"
              hide-details
            />
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// @ is an alias to /src
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
} from '@vue/composition-api';
import { CalendarEvent } from 'vuetify';
import { parseDate } from 'vuetify/lib/components/VCalendar/util/timestamp';
import { todayCalendarEventMockData } from '@/store/calendar-event';
import { CalendarEventTodayDetail } from '@/store/calendar-event.model';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';

export default defineComponent({
  setup(prop, context) {
    const state = reactive({
      // 本日の日付
      today: parseDate(new Date()),
      // カレンダーを共有しているユーザー
      sharedUsers: sharedUserStore.sharedUsers,
      // 本日の曜日
      displayWeekday: computed((): string => {
        return ['日', '月', '火', '水', '木', '金', '土', '日'][
          state.today.weekday
        ];
      }),
      /**
       * 時間指定のないイベント
       * スイッチによってフィルタリング
       */
      filterdEvents: computed((): CalendarEventTodayDetail[] => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return todayCalendarEventMockData.filter(
          event => displayUserIds.includes(event.userId) && !event.startTime,
        );
      }),
      /**
       * 時間指定のあるイベント
       * スイッチによってフィルタリング
       */
      filteredEventsHasTime: computed((): CalendarEventTodayDetail[] => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return todayCalendarEventMockData.filter(
          event => displayUserIds.includes(event.userId) && event.startTime,
        );
      }),
      // タイムラインをどうか示す値
      displayTimeline: computed((): boolean => {
        return state.filteredEventsHasTime.length > 0;
      }),
    });
    /**
     * イベントの色を取得
     */
    const getEventColor = (event: CalendarEvent) => {
      if (!event) {
        return;
      }

      return getThemeColor(event.userId);
    };
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
      ...toRefs(state),
      getEventColor,
      calendar,
      profile,
      share,
    };
  },
});
</script>
