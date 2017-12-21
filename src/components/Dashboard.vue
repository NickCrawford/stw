<template>
  <main class="dashboard">
    <router-view/>
  </main>
</template>

<script>
import Logout from '@/components/Auth/Logout';

export default {

  name: 'Dashboard',

  components: { Logout },

  data() {
    return {

    };
  },
};
</script>

<style lang="css" scoped>
</style>