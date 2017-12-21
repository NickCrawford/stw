import firebase from 'firebase'
import store from './'


console.log(store);

const db = firebase.firestore()
const organizations = db.collection('organizations')

// Getting Real time feeds
organizations.onSnapshot(querySnapshot => {
  const myOrganizations = []
  querySnapshot.forEach(doc => {
    myOrganizations.push({ id: doc.id, ...doc.data() })
  })
  store.commit('watchOrganizations', myOrganizations);
})

export default {
  fetchOrganizations: () => {
    return organizations.get()
  },

  addOrganization: newOrganization => {
    return organizations.add({ newOrganization })
  },

  removeOrganization: id => {
    return organizations.doc(id).delete()
  },
};