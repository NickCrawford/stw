/* eslint-disable no-shadow */

const state = {
  loadedOrganizations: [],
  currentOrganizationId: 'P6EzKugvHCBwekf44diy',
};

const mutations = {
  SET_LOADED_ORGANIZATIONS (state, payload) {
    state.loadedOrganizations = payload;
  },
  CREATE_ORGANIZATION (state, payload) {
    state.loadedOrganizations.push(payload);
  },
};

const actions = {
  // This is the same as putting context.commit as the parameter
  loadOrganizations({ rootState, commit }) { 
    commit('SET_LOADING', true, { root: true }); // Call SET_LOADING mutation on root state.

    rootState.db.collection('organizations').get()
    .then((querySnapshot) => {

      const organizations = [];

      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        const obj = doc.data();

        organizations.push({
          id: doc.id,
          name: obj.name,
          mission: obj.mission,
          dateCreated: obj.dateCreated,
          // creatorId: obj.creatorId,
        });
      });

      commit('SET_LOADED_ORGANIZATIONS', organizations);
      commit('SET_LOADING', false, { root: true });
    })
    .catch((error) => {
      commit('SET_LOADING', false, { root: true });
      console.log('Error getting document:', error);
    });
  },

  createOrganization({ rootState, commit, rootGetters }, payload) {
    const currentUser = rootGetters['users/user'];

    const organization = {
      name: payload.name,
      mission: payload.mission,
      dateCreated: new Date().toISOString(),
      creatorId: currentUser.id
    };

    rootState.db.collection('organizations').add(organization)
    .then((docRef) => {
      const key = docRef.key;
      commit('CREATE_ORGANIZATION', {
        ...organization,
        id: key,
      });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  },

  seed({ dispatch }) {
    dispatch('createOrganization', {
      name: 'New Organization',
      mission: 'To save the world!',
    });
  },

  // async get({ commit, rootState }) {
  //   const organizationRef = rootState.db.collection('organizations');
  //   const organizations = await organizationRef.get();

  //   organizations.forEach(org => commit('UPDATE_ORGANIZATION', { org }));
  // todo check for failure with try, catch
  // },
};

const getters = {
  loadedOrganizations (state) {
    return state.loadedOrganizations.sort((orgA, orgB) => {
      return orgA.dateCreated > orgB.dateCreated
    })
  },
  loadedOrganization (state) {
    // console.log('Getting org:', state.currentOrganizationId);
    return state.loadedOrganizations.find((org) => {
      return org.id === state.currentOrganizationId;
    })
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
