<template>
  <main class="dashboard">
    <main>
      <p>{{ organizations }}</p>
    </main>
    <init/>
    <router-view/>
  </main>
</template>

<script>
import { mapState } from 'vuex';

import Logout from '@/components/Auth/Logout';
import Init from '@/components/Init';

export default {

  name: 'Dashboard',

  components: { Logout, Init },

  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      organizations: state => state.organizations.all,
    }),
  },

  created() {
    // todo: LOAD MESSAGES
  },
};
</script>

<style lang="css" scoped>
main {
  outline: 1px solid blue;
}
</style>