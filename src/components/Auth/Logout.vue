<template>
  <button @click="logOut" class="log-out">Log Out</button>
</template>

<script>
export default {

  name: 'Logout',

  data() {
    return {};
  },

  methods: {
    logOut() {
      this.$store.dispatch('users/logOut')
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