/* eslint-disable no-shadow */

const state = {
  all: {},
  currentOrganization: 'osFbH2crFCagKZItOxmx',
};

const mutations = {
  SET_ORGANIZATION(state, { org }) {
    const data = org.data();
    state.all = {
      ...state.all,
      [org.id]: { created: data.created, name: data.name, mission: data.mission },
    };
    state.allIds.push(org.id);
  },
};

const actions = {
  seed({ rootState }) {
    const organizationRef = rootState.db.collection('organizations');

    organizationRef.doc('osFbH2crFCagKZItOxmx').set({
      name: 'Ocean Motion',
      mission: 'To save the world!',
    });
  },

  async get({ commit, rootState }) {
    const organizationRef = rootState.db.collection('organizations');
    const organizations = await organizationRef.get();

    organizations.forEach(org => commit('SET_ORGANIZATION', { org })); // todo check for failure with try, catch
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
