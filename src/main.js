// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Firebase from 'firebase';

import App from './App';
import router from './router';
import store from './store';


import firebaseConfig from './config';

Vue.config.productionTip = false;

Firebase.initializeApp(firebaseConfig);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  created () {
    this.$store.dispatch('initializeDatabase');
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('users/autoLogIn', user);
      }
    })
    this.$store.dispatch('organizations/loadOrganizations');
  },
});