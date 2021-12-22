<template>
  <VueQueryDevTools />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { VueQueryDevTools } from 'vue-query/devtools';
import { useQueryProvider } from 'vue-query';

export default defineComponent({
  name: 'App',
  components: {
    VueQueryDevTools
  },
  setup() {
    useQueryProvider({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
  },
})
</script>
