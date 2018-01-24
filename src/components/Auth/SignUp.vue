<template>
  <div class="sign-up">
    <h3>Sign Up</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="flex-row">
      <button @click="onSignup">Sign Up</button>
      <p>Already have an account? <router-link :to="{ name: 'Login' }">Log In</router-link></p>
    </div>
  </div>
</template>

<script>

export default {

  name: 'SignUp',

  data() {
    return {
      email: '',
      password: '',
    };
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push({ name: 'Dashboard' })
      }
    }
  },

  methods: {
    onSignup () {
      this.$store.dispatch('users/signUserUp', {email: this.email, password: this.password})
    },
  },
};
</script>

<style lang="css" scoped>
</style>