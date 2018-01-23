import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import 'firebase/firestore';
import 'babel-polyfill';

import firebaseConfig from '../config';
// Modules
import organizations from './modules/organizations';
import users from './modules/users';

Vue.use(Vuex);
Firebase.initializeApp(firebaseConfig);

const state = {
  db: Firebase.firestore(),
  loading: false,
  error: null,
};

export default new Vuex.Store({
  state,
  modules: {
    organizations,
    users,
  },
});
