<template>
  <main class="dashboard">
    <main v-if="user">
      <h1>Dashboard:</h1>
      <init/>
      <logout/>
      <br>
      <h2>Current Organization</h2><router-link :to="{ name: 'OrganizationList' }">Show All</router-link>
      <p>{{ org }}</p>
      <br>
      <h2>User:</h2>
      <p><br/>
        {{ user }}
      </p>
    </main>
    <p v-else>Log in to see more!</p>
    <router-view/>
  </main>
</template>

<script>
import Firebase from 'firebase';
import { mapState } from 'vuex';

import Init from '@/components/Init';
import Logout from '@/components/Auth/Logout';

export default {

  name: 'Dashboard',

  components: { Init, Logout },

  data() {
    return {

    };
  },

  created() {
    this.$store.dispatch('organizations/loadOrganizations');
  },

  computed: {
    org() {
      return this.$store.getters['organizations/loadedOrganization'];
    },

    user() {
      console.log('user:', this.$store.getters['users/user']);
      return this.$store.getters['users/user'];
    },

    userIsAuthenticated() {
      return this.$store.getters['users/userIsAuthenticated'];
    },
  },
};
</script>

<style lang="css" scoped>
main {
  outline: 1px solid blue;
}
</style>