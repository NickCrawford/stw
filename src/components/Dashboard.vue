<template>
  <main class="dashboard">
    <main v-if="user">
      <h1>Secret Developer Menu:</h1>
      <init/>
      <logout/>
      <br>
      <h2>Current Organization</h2>
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

  computed: {
    org() {
      return this.$store.getters['organizations/loadedOrganization'];
    },

    user() {
      return this.$store.getters['users/user'];
    },
  },

  created() {
    // Firebase.auth().onAuthStateChanged((user) => {
    //   console.log('Auth Changed', user);
    //   if (user) {
    //     // If the user is signed in, watch for changes in the organization collection
    //     this.$store.state.db.collection('organizations').doc(this.currentOrganization).onSnapshot((org) => {
    //       const source = org.metadata.hasPendingWrites ? 'Local' : 'Server';

    //       console.log(`Source ${source}`);
    //       console.log('Org', org, org.data());

    //       if (org && org.data()) {
    //         this.$store.commit('organizations/UPDATE_ORGANIZATION', { org });
    //       }
    //     }, (error) => {
    //       console.log('err', error);
    //     });
    //   } else {
    //     // If the user isn't signed in, un subscribe from watching changes
    //     console.log('db', this.$store.state);
    //     this.$store.state.db.collection('organizations')
    //     .onSnapshot(() => {}); // Unsubscribe from changes

    //     console.log('no user signed in unsubbing');
    //   }
    // });
  },
};
</script>

<style lang="css" scoped>
main {
  outline: 1px solid blue;
}
</style>