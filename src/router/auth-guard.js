import store from '../store'

export default (to, from, next) => {
  console.log('Auth required for this route', store);
  console.log(`to: ${to.name}, from: ${from.name}`);
  if (store.getters['users/user']) {
    console.log('User Found')
    next()
  } else {
    console.log('User NOT Found')
    next('/login')
  }
}
