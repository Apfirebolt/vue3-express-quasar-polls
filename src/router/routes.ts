import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', component: () => import('pages/Index.vue') 
      },
      { 
        path: '/login', component: () => import('pages/auth/Login.vue') 
      },
      { 
        path: '/register', component: () => import('pages/auth/Register.vue') 
      },
      { 
        path: '/polls', component: () => import('pages/polls/List.vue') 
      },
      { 
        path: '/polls/create', component: () => import('pages/polls/Create.vue') 
      },
      { 
        path: '/polls/:pollId', component: () => import('pages/polls/Detail.vue') 
      },
      { 
        path: '/polls/update/:pollId', component: () => import('pages/polls/Update.vue') 
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
