import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        name: 'Home', 
        component: () => import('pages/Index.vue') 
      },
      { 
        path: '/login',
        name: 'Login',  
        component: () => import('pages/auth/Login.vue') 
      },
      { 
        path: '/register',
        name: 'Register',  
        component: () => import('pages/auth/Register.vue') 
      },
      { 
        path: '/users',
        name: 'Users',  
        component: () => import('pages/users/List.vue') 
      },
      { 
        path: '/users/:username',
        name: 'UserDetail',  
        component: () => import('pages/users/Detail.vue') 
      },
      { 
        path: '/polls',
        name: 'Polls',  
        component: () => import('pages/polls/List.vue') 
      },
      { 
        path: '/polls/create',
        name: 'CreatePoll',  
        component: () => import('pages/polls/Create.vue') 
      },
      { 
        path: '/polls/:pollId',
        name: 'PollDetail',  
        component: () => import('pages/polls/Detail.vue') 
      },
      { 
        path: '/polls/update/:pollId',
        name: 'UpdatePoll',  
        component: () => import('pages/polls/Update.vue') 
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
