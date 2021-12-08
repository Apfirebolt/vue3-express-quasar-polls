<template>
  <app-page>
    <p class="text-center text-h5 text-blue-5">Users</p>
    <search-form @onSearch="searchUserByTerm" />
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
            <q-btn color="green-7" @click.prevent="goToUserDetail(user.username)"
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
import { useRouter } from 'vue-router';
import useUsers from '../../composables/users/index';
import SearchForm from '../../components/SearchBar.vue';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'ListUsers',
  components: {
    AppPage,
    SearchForm,
  },
  setup() {
    const { users, list } = useUsers();
    const router = useRouter();
    const searchUserByTerm = (term: string) => {
      console.log('User term ', term);
      list(term);
    }

    list();
    const filterDate = (dateString: string) => {
      return date.formatDate(dateString, 'YYYY-MM-DD')
    }
    const goToUserDetail = (username: string) => {
      router.push({ name: 'UserDetail', params: { username } })
    };
    return {
      users,
      goToUserDetail,
      filterDate,
      searchUserByTerm
    };
  },
});
</script>
