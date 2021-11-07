<template>
  <app-page>
    <p class="text-center text-h5 text-blue-5">Users</p>
    <div class="q-pa-md row items-start justify-between q-gutter-md">
      <div v-for="user in users" :key="user._id" class="col-sm-12 col-md-5">
        <q-card class="my-card">
          <q-card-section class="bg-green-7 text-white">
            <div class="text-h6">{{ user.email }}</div>
            <div class="text-subtitle2">
              {{ user.firstName + ' ' + user.lastName }}
            </div>
            <q-chip square color="primary" text-color="white" icon="people">
              {{ user.username }}
            </q-chip>
          </q-card-section>

          <q-card-actions align="right">
            <p class="text-red-5 q-mr-md">Created At {{ filterDate(user.createdAt) }}</p>
            <q-btn color="green-7" @click.prevent="goToUserDetail(user._id)"
              >Details</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </app-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { date } from 'quasar';
import useUsers from '../../composables/users/index';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'ListUsers',
  components: {
    AppPage,
  },
  setup() {
    const { users, list } = useUsers();
    list();
    const filterDate = (dateString: string) => {
      return date.formatDate(dateString, 'YYYY-MM-DD')
    }
    const goToUserDetail = (userId: string) => {
      console.log(userId);
    };
    return {
      users,
      goToUserDetail,
      filterDate
    };
  },
});
</script>
