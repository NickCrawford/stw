<template>
  <div class="auth-container">
    <div class="text-prompt-container">
      <h1>You're going to save the world.</h1>
      <h2>But first, you've got to sign in.</h2>
    </div>
    <div class="sign-up-container">
      <sign-up v-if="$props.showSignUp"/>
      <login v-else/>
    </div>
  </div>
</template>

<script>
/* This component handles sign-up and log-in. Most likely with facebook, twitter or email */

import Login from './Login';
import SignUp from './SignUp';

export default {

  name: 'Auth',
  props: ['showSignUp'],
  components: { Login, SignUp },

  data() {
    return {};
  },

  created() {
    if (this.$store.getters['users/userIsAuthenticated']) {
      this.$router.push({ name: 'Dashboard' });
    }
  },
};
</script>

<style lang="css">
  .auth-container {
    display: flex;
    outline: 1px solid green;
  }

  .text-prompt-container {
    width: 40%;

    text-align: left;
  }

  .sign-up-container {
    width: 60%;
  }

  .sign-up, .log-in {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 15px 30px;

    background-color: var(--bg-white);
  }

  .sign-up h3, .log-in h3 {
    display: inline-block;
  }

  input {
    display: block;
    width: 100%;

    margin: 2em auto;
    padding: 1em;

    font-size: 16px;
  }

  button {
    display: block;

    margin: 0 auto 1em;
    padding: 0.5em 1em;

    font-size: 1em;
    cursor: pointer;
  }
</style>