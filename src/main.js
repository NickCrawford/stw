// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Firebase from 'firebase';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

let app;

// Initialize Firebase
// Firebase.initializeApp(firebaseConfig); // Initialized in 'store/index.js'
Firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App },
    });
  }
});
