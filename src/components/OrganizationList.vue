<template>
  <div>
    <h1>All Organizations</h1>
    <ul>
      <li v-for="org in orgList">
        {{ org }}
        <br><br>
      </li>

    </ul>
  </div>
</template>

<script>
export default {

  name: 'OrganizationList',

  components: {},

  data() {
    return {

    };
  },

  computed: {
    orgList() {
      return this.$store.getters['organizations/loadedOrganizations'];
    },
  },

  methods: {

  },

};
</script>

<style lang="css">
</style>