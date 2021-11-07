<template>
  <q-page class="app-page">
    <div v-if="$slots.header">
      <slot name="header" />
    </div>
    <slot></slot>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppPage',
});
</script>

<style lang="scss">
.app-page {
  padding: 16px;
  max-width: 1020px;
  margin-left: auto;
  margin-right: auto;
}
</style>
