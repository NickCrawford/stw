<template>
  <div class="log-in">
    <h3>Log In</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="flex-row">
      <button @click="logIn">Continue</button>
      <p>New to Save the World? <router-link :to="{ name: 'SignUp' }">Sign Up</router-link></p>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase';

export default {

  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    logIn() {
      Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('You\'ve signed in!');
        this.$router.replace({ name: 'Dashboard' });
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