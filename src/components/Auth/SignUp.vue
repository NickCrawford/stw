<template>
  <div class="sign-up">
    <h3>Sign Up</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="flex-row">
      <button @click="signUp">Sign Up</button>
      <p>Already have an account? <router-link :to="{ name: 'Login' }">Log In</router-link></p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {

  name: 'SignUp',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log('Account has been created');
        console.log(user);
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