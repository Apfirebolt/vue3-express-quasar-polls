<template>
  <q-page>
    <p>List Poll Page</p>
    {{ polls }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import usePolls from '../../composables/polls/index';

export default defineComponent({
  name: 'ListPoll',
  setup() {
    const { polls, list } = usePolls();
    list();
    return {
      polls,
    };
  },
});
</script>
