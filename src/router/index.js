import Vue from 'vue';
import Router from 'vue-router';
import Firebase from 'firebase';

import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Auth from '@/components/Auth/Auth';
import OnBoarding from '@/components/OnBoarding';
import OrganizationList from '@/components/OrganizationList';

import AuthGuard from './auth-guard'
// import { store } from '../store'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/orgs',
      name: 'OrganizationList',
      component: OrganizationList,
      // meta: { requiresAuth: true },
      beforeEnter: AuthGuard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          // meta: { requiresAuth: true },
          beforeEnter: AuthGuard
        },
        {
          // Auth will be rendered inside User's <router-view>
          // when /dashboard/login is matched
          name: 'Login',
          path: 'login',
          component: Auth,
          props: { showSignUp: false },
          alias: '/login',
        },
        {
          // Auth will be rendered inside User's <router-view>
          // when /dashboard/signup is matched
          name: 'SignUp',
          path: 'signup',
          component: Auth,
          props: { showSignUp: true },
          alias: '/signup',
        },
        {
          // Auth will be rendered inside User's <router-view>
          // when /dashboard/signup is matched
          name: 'Start',
          path: 'start',
          component: OnBoarding,
          // meta: { requiresAuth: true },
          beforeEnter: AuthGuard
        },
      ],
    },

  ],
});

export default router;
