import Firebase from 'firebase';
import { store } from '../store'

export default (to, from, next) => {
  console.log('Auth required for this route', store);
  console.log(`to: ${to.name}, from: ${from.name}`);
  console.log(store.getters['users/user']);

  Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('users/autoLogIn', user)
      .then(response => {
        if (store.getters['users/user']) {
          console.log('User Found')
          next()
        } else {
          console.log('User NOT Found')
          next('/login')
        }
      });
    } else {
      next('/login');
    }
  });

  
}
