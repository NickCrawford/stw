import Vue from 'vue';
import Router from 'vue-router';
import Firebase from 'firebase';

import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Auth from '@/components/Auth/Auth';
import OnBoarding from '@/components/OnBoarding';
import OrganizationList from '@/components/OrganizationList';

import AuthGuard from './auth-guard'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   redirect: '/',
    // },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/orgs',
      name: 'OrganizationList',
      component: OrganizationList,
      beforeEnter: AuthGuard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
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
          beforeEnter: AuthGuard
        },
      ],
    },

  ],
});

// router.beforeEach((to, from, next) => {
//   console.log(`to: ${to.name}, from: ${from.name}`);
//   // Get the current user from Firebase. If no-one is logged in, it returns 'null'
//   const currentUser = Firebase.auth().currentUser;
//   // Find out if the route we're going to has the 'requiresAuth' meta field set to true.
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) next('/dashboard/login'); // Go to login screen if user isn't logged in and tries to access a route that require authentication
//   else if (!requiresAuth && currentUser) next('/dashboard');
//   else next();
// });

export default router;
