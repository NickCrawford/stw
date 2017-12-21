<template>
  <button @click="logOut" class="log-out">Log Out</button>
</template>

<script>
import Firebase from 'firebase';

export default {

  name: 'Logout',

  data() {
    return {};
  },

  methods: {
    logOut() {
      Firebase.auth().signOut()
      .then(() => {
        console.log('You\'ve signed out!');
        this.$router.replace({ name: 'Login' });
      })
      .catch((err) => {
        console.log(`Oops... ${err}`);
      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>