<template>
  <q-page class="row items-center justify-evenly">
    <p>Settings Page</p>
    {{ profileData }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAuth from '../../composables/auth/index';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const { profile, profileData } = useAuth();
    profile();
    return {
      profileData
    }
  }
});
</script>
