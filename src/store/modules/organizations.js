/* eslint-disable no-shadow */

const state = {
  loadedOrganizations: [{
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
    id: 'afajfjadfaadfa323',
    title: 'Ocean Motion',
    dateCreated: new Date(),
    location: 'Kent, OH',
    mission: 'We save the world by promoting ocean conservation at Kent State',
  },
  {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
    id: 'afajfjadfaadfa324',
    title: 'DSA',
    dateCreated: new Date(),
    location: 'Kent, OH',
    description: 'We save the world by being democratic',
  }],
  currentOrganizationId: 'afajfjadfaadfa323',
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
    console.log('Load organization');
    commit('SET_LOADING', true);

    rootState.db.collection('organizations').get()
    .then((doc) => {
      if (doc.exists) {
        const obj = doc.data();

        const organizations = [];

        for (const key in obj) {
          organizations.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            dateCreated: obj[key].dateCreated,
            // creatorId: obj[key].creatorId,
          });
        }
        commit('SET_LOADED_ORGANIZATIONS', organizations);
        commit('SET_LOADING', false);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      commit('SET_LOADING', false);
      console.log('Error getting document:', error);
    });
  },

  createOrganizations({ rootState, commit, getters }, payload) {
    console.log('Create organization');

    const organization = {
      title: payload.title,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      dateCreated: payload.dateCreated.toISOString(),
      // creatorId: getters.user.id
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

  seed({ rootState }) {
    const organizationRef = rootState.db.collection('organizations');

    organizationRef.doc('osFbH2crFCagKZItOxmx').set({
      name: 'Ocean Motion',
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
    console.log('Getting org:', state.currentOrganizationId);
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
