// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Firebase from 'firebase';

import App from './App';
import router from './router';
import { store } from './store';


import firebaseConfig from './config';

Vue.config.productionTip = false;

const unsubscribe = Firebase.initializeApp(firebaseConfig).auth().onAuthStateChanged((user) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),

    created () {
      this.$store.commit('INITIALIZE_DATABASE');
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // If firebase says the user is already logged in when the app loads, put that user into the store
          // this.$store.dispatch('users/autoLogIn', user); 
          
          // Load all organizations into store
          // this.$store.dispatch('organizations/loadOrganizations'); 
        }
      })
    },
  });

  // remove this listener so that we aren't trying to make new vue objects
  // every time the auth state changes.
  unsubscribe();
});
