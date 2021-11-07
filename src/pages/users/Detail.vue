<template>
  <app-page>
    <p>Detail User Page</p>
  </app-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'DetailUser',
  components: {
    AppPage
  }
});
</script>
