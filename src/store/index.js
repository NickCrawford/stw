import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import 'firebase/firestore';
import 'babel-polyfill';

// Modules
import organizations from './modules/organizations';
import users from './modules/users';

Vue.use(Vuex);

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
  },
  INITIALIZE_DATABASE (state) {
    state.db = Firebase.firestore();
  }
};

const actions = {

  clearError ({commit}) {
    commit('CLEAR_ERROR')
  }
};

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    organizations,
    users,
  },
});