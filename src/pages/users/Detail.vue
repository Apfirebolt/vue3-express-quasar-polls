<template>
  <app-page v-if="user">
    <p v-if="user.polls.length" class="text-h6 text-red-6 text-center">
      All Polls Created by {{ user.user.username }}
    </p>
    <p v-else class="text-h6 text-red-6 text-center">
      {{ user.user.username }} hasn't created any polls yet
    </p>
    <div class="q-pa-md">
      <q-table :rows="user.polls" row-key="_id" :columns="columns">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              outline
              color="red"
              @click.prevent="goToPollDetail(props.row._id as string)"
            >Details</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </app-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUsers from '../../composables/users/index';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'DetailUser',
  components: {
    AppPage,
  },
  setup() {
    const { user, single } = useUsers();
    const route = useRoute();
    const router = useRouter();

    const columns = [
      {
        name: 'title',
        required: true,
        label: 'Poll Title',
        align: 'left',
        field: 'title',
      },
      {
        name: 'description',
        label: 'Poll Description',
        align: 'left',
        field: 'description',
      },
      {
        name: 'actions',
        label: 'Actions',
        required: true,
        align: 'center',
      },
    ];

    single(route.params.username as string);

    const goToPollDetail = (pollId: string) => {
      router.push({ name: 'PollDetail', params: { pollId } })
    }

    return {
      user,
      columns,
      goToPollDetail
    };
  },
});
</script>
