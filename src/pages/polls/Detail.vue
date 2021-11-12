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
        <q-btn label="Vote" color="primary" icon="poll" @click.prevent="voteOnPoll(choice.name)" />
      </div>
    </div>
    <q-btn label="Remove Vote" color="red-5" class="q-my-md" icon="delete" @click.prevent="removeVoteFromPoll" />
    <div>
      <q-chip v-for="vote in poll.votes" :key="vote._id" class="glossy" color="orange" text-color="white" icon-right="star">
       {{ vote.voted_by.username }} voted for {{ vote.selectedChoice }}
      </q-chip>
    </div>
  </app-page>
</template>

<script lang="ts">
import { defineComponent, watchEffect, computed } from 'vue';
import AppPage from 'src/hoc/AppPage.vue';
import usePolls from '../../composables/polls/index';
import { Poll } from '../../composables/polls/model';
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
    const { poll, single, addVote, success, removeVote } = usePolls();
    single(route.params.pollId as string);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // const alreadyVoted = computed(() => poll.votes.find((item: Poll) => item.voted_by._id === accessToken._id));

    watchEffect(() => {
      if (success.value) {
        success.value = false;
        single(route.params.pollId as string);
      }
    }) 

    const voteOnPoll = (choiceName: string) => {
      addVote(route.params.pollId as string, choiceName)
    }

    const removeVoteFromPoll = () => {
      removeVote(route.params.pollId as string)
    }

    return {
      poll,
      accessToken,
      voteOnPoll,
      removeVoteFromPoll,
    };
  },
});
</script>
