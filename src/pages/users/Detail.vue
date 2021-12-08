<template>
  <app-page>
    <p>Detail User Page</p>
    {{ user }}
  </app-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import useUsers from '../../composables/users/index';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'DetailUser',
  components: {
    AppPage
  },
  setup() {
    const { user, single } = useUsers();
    const route = useRoute();
    
    single(route.params.username as string);
    
    return {
      user
    };
  },
});
</script>
