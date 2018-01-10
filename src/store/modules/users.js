/* eslint-disable no-shadow */
import Firebase from 'firebase';

const state = {
  user: 'hi',
};

const mutations = {
  SET_USER(state) {
    state.user = Firebase.auth().currentUser;
  },
};

const getters = {
  getUser(state) {
    console.log('Getting User', state, state.user);
    return state.user;
  },
};

const actions = {
  setUser({ rootState }) {
    rootState.commit('SET_USER');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
