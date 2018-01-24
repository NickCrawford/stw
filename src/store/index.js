import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import 'firebase/firestore';
import 'babel-polyfill';

// Modules
import organizations from './modules/organizations';
import users from './modules/users';

Vue.use(Vuex);
// Firebase.initializeApp(firebaseConfig);

const state = {
  db: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_LOADING (state, payload) {
    state.loading = payload;
  },
  SET_ERROR (state, payload) {
    state.error = payload;
  },
  CLEAR_ERROR (state) {
    state.error = null;
  }
};

const actions = {
  initializeDatabase({ state }) {
    state.db = Firebase.firestore();
  },

  clearError ({commit}) {
    commit('CLEAR_ERROR')
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    organizations,
    users,
  },
});