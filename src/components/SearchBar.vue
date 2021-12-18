<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pa-md" id="search-form">
    <div class="row justify-between items-center">
      <q-input
        outlined
        hide-bottom-space
        id="searchText"
        name="searchText"
        label="Search"
        class="col-md-8"
        v-model="searchText"
      ></q-input>

      <q-btn
      label="Search"
      color="primary"
      class="col-md-3"
      type="submit"
    />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';

export default defineComponent({
  name: 'SearchForm',
  emits: ['onSearch'],
  setup(props, { emit }) {
    const searchText = ref<string>('');
    const onSubmit = () =>  {
      emit('onSearch', searchText.value);
    };

    watchEffect(() => {
      if (searchText.value.length < 3) {
        emit('onSearch', undefined);
      }
    });

    return {
      searchText,
      onSubmit
    };
  }
});
</script>
