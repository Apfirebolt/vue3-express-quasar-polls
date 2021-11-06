<template>
  <q-form @submit="onSubmit" class="q-gutter-md" id="clienttype-form">
    <q-input
      outlined
      hide-bottom-space
      :error="!!errors['name']"
      :error-message="errors['name']"
      id="name"
      name="name"
      label="Name"
      :errors="errors"
      v-model="name"
    ></q-input>
    <q-input
      outlined
      hide-bottom-space
      :error="!!errors['description']"
      :error-message="errors['description']"
      id="description"
      name="description"
      label="Description"
      :errors="errors"
      v-model="description"
    ></q-input>
    <q-btn
      label="Submit"
      color="primary"
      type="submit"
      :loading="isSubmitting"
    />
  </q-form>
</template>

<script lang="ts">
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import {
  ClientTypeCreatePayload,
  ClientTypeCreatePayloadSchema,
} from '../../validators/user';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const validationSchema = toFormValidator(ClientTypeCreatePayloadSchema);
    const { handleSubmit, isSubmitting, errors } =
      useForm<ClientTypeCreatePayload>({
        validationSchema,
      });

    const { value: name } = useField('name');
    const { value: description } = useField('description');

    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });

    return {
      isSubmitting,
      errors,
      onSubmit,
      name,
      description
    };
  },
});
</script>
