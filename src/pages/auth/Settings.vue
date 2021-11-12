<template>
  <q-page>
    <p class="text-center text-h5 text-blue-5 q-my-md">PROFILE SETTINGS</p>
    <q-form @submit="onSubmit" class="q-gutter-md q-pa-md" id="register-form">
      <q-input
        outlined
        hide-bottom-space
        :error="!!errors['username']"
        :error-message="errors['username']"
        id="username"
        name="username"
        label="Username"
        :errors="errors"
        v-model="username"
      ></q-input>
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
        :error="!!errors['firstName']"
        :error-message="errors['firstName']"
        id="firstName"
        name="firstName"
        label="Your First Name"
        :errors="errors"
        v-model="firstName"
      ></q-input>
       <q-input
        outlined
        hide-bottom-space
        :error="!!errors['lastName']"
        :error-message="errors['lastName']"
        id="lastName"
        name="lastName"
        label="Your Last Name"
        :errors="errors"
        v-model="lastName"
      ></q-input>
      <q-separator class="q-my-md"></q-separator>
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import useAuth from '../../composables/auth/index';
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { Notify } from 'quasar';
import {
  UserCreatePayload,
  UserCreatePayloadSchema,
} from '../../composables/auth/model';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const { profile, profileData, success, register } = useAuth();
    const validationSchema = toFormValidator(UserCreatePayloadSchema);
    const { handleSubmit, isSubmitting, errors } = useForm<UserCreatePayload>({
      validationSchema,
    });

    const { value: username } = useField('username');
    const { value: firstName } = useField('firstName');
    const { value: lastName } = useField('lastName');
    const { value: email } = useField('email');
    const { value: password } = useField('password');

    const onSubmit = handleSubmit(async (values) => {
      await register(values);
    });

    watchEffect(() => {
      if (success.value) {
        Notify.create({
          type: 'positive',
          position: 'top',
          message: 'Profile updated successfully',
        });
      }
    });

    profile();
    return {
      profileData,
      isSubmitting,
      errors,
      onSubmit,
      username,
      firstName,
      lastName,
      email,
      password,
      success,
    };
  },
});
</script>
