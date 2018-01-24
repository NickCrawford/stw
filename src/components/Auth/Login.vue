<template>
  <div class="log-in">
    <h3>Log In</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="flex-row">
      <button @click="onSignIn">Continue</button>
      <p>New to Save the World? <router-link :to="{ name: 'SignUp' }">Sign Up</router-link></p>
    </div>
  </div>
</template>

<script>

export default {

  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    user () {
      return this.$store.getters['users/user'];
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push({ name: 'Dashboard' });
      }
    }
  },
  methods: {
    onSignIn () {
      this.$store.dispatch('users/signUserIn', {email: this.email, password: this.password})
    },
  },
};
</script>

<style lang="css" scoped>
</style>