import store from '../store'

export default (to, from, next) => {
  console.log('store', store);
  if (store.getters['users/user']) {
    next()
  } else {
    next('/login')
  }
}
