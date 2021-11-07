<template>
  <q-page>
    <p>List Users Page</p>
    {{ users }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUsers from '../../composables/users/index';

export default defineComponent({
  name: 'ListUsers',
  setup() {
    const { users, list } = useUsers();
    list();
    return {
      users,
    };
  },
});
</script>
