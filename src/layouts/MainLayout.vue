<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Quasar Polls
        </q-toolbar-title>
        <q-btn flat round dense icon="logout" @click.prevent="logoutFunction" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <span v-for="link in links" :key="link.text" :to="link.route">
            <q-item
              v-ripple
              :to="link.route"
              clickable
              active-class="sidebar-item-active"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </span>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useAuth from '../composables/auth/index';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const router = useRouter();
    const leftDrawerOpen = ref(false)
    const { logout } = useAuth();
    const logoutFunction = () => {
      logout();
      router.push({ name: 'Login' });
    }
    return {
      leftDrawerOpen,
      logoutFunction,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      links: [
        {
          icon: 'home',
          text: 'Home',
          route: { name: 'Home' },
        },
        {
          icon: 'poll',
          text: 'Polls',
          route: { name: 'Polls' },
        },
        {
          icon: 'people',
          text: 'Users',
          route: { name: 'Users' },
        },
        {
          icon: 'settings',
          text: 'Profile',
          route: { name: 'Settings' },
        },
      ],
    }
  }
})
</script>
