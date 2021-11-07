<template>
  <app-page>
    <p class="text-center text-h5 text-blue-5">Polls</p>
    <div class="q-pa-md row items-start justify-between q-gutter-md">
      <div v-for="poll in polls" :key="poll._id" class="col-sm-12 col-md-5">
        <q-card class="my-card">
          <q-card-section class="bg-green-7 text-white">
            <div class="text-h6">{{ poll.title }}</div>
            <div class="text-subtitle2">Poll Choices</div>
          </q-card-section>
          <q-list bordered separator>
            <q-item
              clickable
              v-ripple
              v-for="(choice, index) in poll.choices"
              :key="index"
              class="flex justify-between items-center"
            >
              <q-item-section>
                <q-item-label>{{ choice.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator />

          <q-card-actions align="right">
            <q-btn
              v-if="poll.createdBy === accessToken._id"
              color="red-5"
              @click.prevent="openDeletePollModal(poll._id)"
              >Delete</q-btn
            >
            <q-btn color="green-7" @click.prevent="goToPollDetail(poll._id)"
              >Details</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="isDeleteModalOpened">
      <delete-poll-modal
        @deletePoll="deletePollConfirm"
        :deleteMessage="deletePollMessage"
      />
    </q-dialog>
  </app-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import usePolls from '../../composables/polls/index';
import DeletePollModal from '../../components/DeletePollModal.vue';
import AppPage from 'src/hoc/AppPage.vue';
import { useRouter } from 'vue-router';
import { useAccessToken } from '../../composables/auth';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'ListPoll',
  components: {
    AppPage,
    DeletePollModal,
  },
  setup() {
    const accessToken = useAccessToken();
    const { polls, list, deletePoll } = usePolls();
    const router = useRouter();
    const isDeleteModalOpened = ref<boolean>(false);
    const deletePollMessage = ref<string>('');
    const selectedPoll = ref<string>('');
    list();

    const goToPollDetail = (id: string) => {
      router.push({ name: 'PollDetail', params: { pollId: id } });
    };

    const openDeletePollModal = (id: string) => {
      isDeleteModalOpened.value = true;
      selectedPoll.value = id;
      const selectPoll = polls.value.find((item) => item._id === id);
      if (selectPoll) {
        deletePollMessage.value = `Are you sure you want to delete the poll titled "${selectPoll.title}"`;
      }
    };

    const deletePollConfirm = async () => {
      await deletePoll(selectedPoll.value);
      Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Poll deleted successfully',
      });
      list();
    };
    return {
      polls,
      isDeleteModalOpened,
      goToPollDetail,
      accessToken,
      deletePollConfirm,
      openDeletePollModal,
      deletePollMessage,
    };
  },
});
</script>
