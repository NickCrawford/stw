/* eslint-disable no-shadow */
import Firebase from 'firebase';

const state = {
  user: null,
};

const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
};

const getters = {
  user(state) {
    // console.log('Getting User', state, state.user);
    return state.user;
  },

  userIsAuthenticated () {
    return state.user !== null && state.user !== undefined
  }
};

const actions = {

  autoLogIn ({commit}, payload) {
    // console.log('Auto log in ', payload);
    commit('SET_USER', { id: payload.uid })
  },

  logout ({commit}) {
    Firebase.auth().signOut()
    commit('SET_USER', null)
  },

  signUserUp ({commit}, payload) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR', null, { root: true });
    Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then((user) => {
      commit('SET_LOADING', false, { root: true })
      const newUser = {
        id: user.uid,
      }
      commit('SET_USER', newUser);
    })
    .catch((error) => {
      commit('SET_LOADING', false, { root: true });
      commit('SET_ERROR', error, { root: true });
      console.log(error)
    })
  },

  signUserIn ({commit}, payload) {
    commit('SET_LOADING', true, { root: true })
    commit('CLEAR_ERROR', null, { root: true })
    Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then((user) => {
      commit('SET_LOADING', false, { root: true })
      const newUser = {
        id: user.uid,
      }
      commit('SET_USER', newUser)
    })
    .catch((error) => {
      commit('SET_LOADING', false, { root: true })
      commit('SET_ERROR', error, { root: true })
      console.log(error)
    })
  },


};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
