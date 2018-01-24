/* eslint-disable no-shadow */
import Firebase from 'firebase';

const state = {
  user: null,
};

const mutations = {
  SET_USER(state) {
    state.user = Firebase.auth().currentUser;
  },
};

const getters = {
  user(state) {
    console.log('Getting User', state, state.user);
    return state.user;
  },
};

const actions = {
  setUser({ commit }) {
    commit('SET_USER');
  },

  logIn({ commit }, user) {
    return Firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((newUser) => {
        commit('SET_USER', newUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  autoLogIn ({commit}, payload) {
    commit('SET_USER', { id: payload.uid })
  },

  logOut({ commit }) {
    return Firebase.auth()
      .signOut()
      .then(() => {
        commit('SET_USER');
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  signUp({ commit }, user) {
    return Firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((newUser) => {
        commit('SET_USER', newUser);
      })
      .catch((error) => {
        console.log('error signing up', error.message);
        throw error;
      });
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
