<template>
  <app-page v-if="poll">
    <p class="text-red-5 text-h4 text-center">{{ poll.title }}</p>
    <p class="q-my-md text-center">{{ poll.description }}</p>
    <div>
      <p class="q-my-md text-h5 text-center">Poll Choices</p>
      <div
        v-for="choice in poll.choices"
        class="
          q-my-md
          flex
          items-center
          justify-between
          q-pa-md
          shadow-3
          bg-red-2
        "
        :key="choice.name"
      >
        <p>{{ choice.name }}</p>
        <q-btn label="Vote" color="primary" icon="poll" />
      </div>
    </div>
  </app-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppPage from 'src/hoc/AppPage.vue';
import usePolls from '../../composables/polls/index';
import { useAccessToken } from '../../composables/auth';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DetailPoll',
  components: {
    AppPage,
  },
  setup() {
    const route = useRoute();
    const accessToken = useAccessToken();
    const { poll, single } = usePolls();
    single(route.params.pollId as string);

    return {
      poll,
      accessToken,
    };
  },
});
</script>
