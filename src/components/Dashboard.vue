<template>
  <main class="dashboard">
    <main>
      <p>{{ organizations }}</p>
      <p><b>User:</b><br/>{{ currentUser }}</p>
    </main>
    <init/>
    <router-view/>
  </main>
</template>

<script>
import { mapState } from 'vuex';

import Init from '@/components/Init';

export default {

  name: 'Dashboard',

  components: { Init },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      organizations: state => state.organizations.all,
      currentOrganization: state => state.organizations.currentOrganization,
      currentUser: state => state.users.user,
    }),
  },

  created() {
    this.$store.state.db.collection('organizations').doc(this.currentOrganization).onSnapshot((org) => {
      const source = org.metadata.hasPendingWrites ? 'Local' : 'Server';

      console.log(`Source ${source}`);
      console.log('Org', org, org.data());

      if (org && org.data()) {
        this.$store.commit('organizations/UPDATE_ORGANIZATION', { org });
      }
    });
  },
};
</script>

<style lang="css" scoped>
main {
  outline: 1px solid blue;
}
</style>