<template>
  <app-page>
    <p class="text-center text-h5 text-blue-5">Update Poll</p>
    <update-poll-form v-if="poll" :poll="poll" />
  </app-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UpdatePollForm from '../../components/UpdatePollForm.vue';
import usePolls from '../../composables/polls/index';
import { useRoute } from 'vue-router';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'UpdatePollPage',
  components: {
    AppPage,
    UpdatePollForm,
  },
  setup() {
    const route = useRoute();
    const { success, single, poll } = usePolls();
    const isChoiceModalOpened = ref<boolean>(false);
    single(route.params.pollId as string);

    return {
      success,
      isChoiceModalOpened,
      poll,
    };
  },
});
</script>
