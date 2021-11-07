<template>
  <q-card
    style="max-width: 1500px; width: 1000px; height: auto"
    class="q-pa-md"
  >
    <q-card-section>
      <div class="text-h6">Delete Poll</div>
      <p class="text-red-5">
        {{ deleteMessage }}
      </p>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red-5" label="Cancel" v-close-popup />
        <q-btn label="Confirm" @click.prevent="deletePollConfirm" v-close-popup />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'DeletePollModal',
  props: {
    deleteMessage: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['deletePoll'],
  setup(props, { emit }) {
    const deletePollConfirm = () => {
      emit('deletePoll')
    }
    return {
      deletePollConfirm
    };
  },
});
</script>
