<template>
  <app-page>
    <p>Update Poll Page</p>
  </app-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'UpdatePoll',
  components: {
    AppPage,
  },
});
</script>
