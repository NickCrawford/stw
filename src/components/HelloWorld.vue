<template>
  <h1>{{msg}} <router-link :to="{ name: 'SignUp' }">Sign Up</router-link></h1>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style scoped>

</style>
