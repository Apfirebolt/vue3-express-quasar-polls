<template>
  <q-card style="max-width: 1500px;width:1000px;height:auto" class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Add Choice</div>
    </q-card-section>

    <q-form @submit="onSubmit" id="add-choice-form">
      <q-input
        outlined
        hide-bottom-space
        type="text"
        :error="!!errors['name']"
        :error-message="errors['name']"
        id="name"
        name="password"
        label="Enter Choice Name"
        :errors="errors"
        v-model="name"
      ></q-input>
      <q-btn
        label="Add Choice"
        color="primary"
        type="submit"
        class="q-my-md"
      />
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { ChoicePayload, ChoicePayloadSchema } from '../composables/polls/model';
export default defineComponent({
  name: 'AddChoiceModal',
  emits: ['addChoice'],
  setup(props, { emit }) {
    const validationSchema = toFormValidator(ChoicePayloadSchema);
    const { handleSubmit, errors } = useForm<ChoicePayload>({
      validationSchema,
    });
    const { value: name } = useField('name');
    const onSubmit = handleSubmit((values) => {
      emit('addChoice', values);
    });
    return {
      onSubmit,
      errors,
      name
    };
  },
});
</script>
