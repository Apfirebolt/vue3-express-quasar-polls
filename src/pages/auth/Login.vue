<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pa-md" id="register-form">
    <q-input
      outlined
      hide-bottom-space
      :error="!!errors['email']"
      :error-message="errors['email']"
      id="email"
      name="email"
      label="Email"
      :errors="errors"
      v-model="email"
    ></q-input>
    <q-input
      outlined
      hide-bottom-space
      type="password"
      :error="!!errors['password']"
      :error-message="errors['password']"
      id="password"
      name="password"
      label="Enter Password"
      :errors="errors"
      v-model="password"
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
  LoginPayload,
  LoginPayloadSchema,
} from '../../composables/auth/model';
import { defineComponent, watchEffect } from 'vue';
import useAuth from '../../composables/auth/index';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const { success, login } = useAuth();
    const validationSchema = toFormValidator(LoginPayloadSchema);
    const { handleSubmit, isSubmitting, errors } =
      useForm<LoginPayload>({
        validationSchema,
      });
    const { value: email } = useField('email');
    const { value: password } = useField('password');
    
    const onSubmit = handleSubmit(async (values) => {
      await login(values);
    });

    watchEffect(() => {
      if (success.value) {
        Notify.create({
          type: 'positive',
          position: 'top',
          message: 'Logged in successfully',
        });
      }
    });

    return {
      isSubmitting,
      errors,
      onSubmit,
      email,
      password,
      success,
    };
  },
});
</script>
