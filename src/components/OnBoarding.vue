<template>
  <div class="onboarding-container">
    <p @click="addStep">Active Step: {{ activeStep }}</p>

    <!-- Step 0: Organization Name -->
    <div class="text-prompt-container"  v-if="activeStep == 0">
      <h1>Name your movement.</h1>
      <h2>Define your mission.</h2>
    </div>
    <div class="form-group" v-if="activeStep == 0">
      <label for="organization-name">Organization Name</label>
      <!-- <input v-model="org" name="organization-name"> -->
    </div>

    <!-- Step 1: Mission Statement -->
    <div class="text-prompt-container"  v-if="activeStep == 1">
      <h1>Define your mission.</h1>
      <h2>What is the purpose of {{ null || 'your organization?' }}</h2>
    </div>


  </div>
</template>

<script>
export default {

  name: 'OnBoarding',

  components: {},

  data() {
    return {
      activeStep: 0,
    };
  },

  computed: {
    org: {
      get() {
        return this.$store.state.organizations.currentOrganization;
      },
      set(value) {
        this.$store.commit('UPDATE_ORGANIZATION_NAME', { orgId: this.org.id, name: value });
      },
    },
  },

  // computed: {

  //   ...mapState({
  //     org: state => state.organizations.currentOrganization,
  //   }),
  // },

  methods: {
    addStep() {
      this.activeStep += 1;
    },
  },

};
</script>

<style lang="css">
</style>