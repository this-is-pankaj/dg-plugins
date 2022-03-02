<template>
  <div id="app" class="wrapper d-flex">
    <div class="nav">
      <nav-bar/>

      <toggle-switch
        :defaultState="pluginsEnabled"
        checkedLabel="All plugins enabled"
        uncheckedLabel="All plugins disabled"
        icon="power"
        labelDir="left"
        class="bottom-section"
        @toggled="toggleAppState"
        :key="hasUpdated"
      />
    </div>
    <router-view class="container"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NavBar from './components/Nav/NavBar.vue';
import ToggleSwitch from './components/ToggleSwitch.vue';

export default {
  components: { NavBar, ToggleSwitch },
  async mounted() {
    const defaultRoute = 'tab1';
    await this.initialize();
    // If no specific tab route is mentioned, redirect to default
    if (!this.$route.params.tabId) {
      this.$router.push(defaultRoute);
    }
  },
  data() {
    return {
      hasUpdated: 'key-false',
    };
  },
  computed: {
    ...mapGetters({
      pluginsEnabled: 'getStateForPlugins',
    }),
  },
  watch: {
    pluginsEnabled() {
      this.hasUpdated = `key-${Date.now()}`;
    },
  },
  methods: {
    ...mapActions({
      initialize: 'FETCH_APP_INFO',
      updateAppState: 'UPDATE_APP_STATUS',
    }),
    toggleAppState(flag) {
      this.updateAppState(flag);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper {
  height: 100vh;

  .container {
    padding: 30px;
    width: 80%;
  }

  .nav {
    background-color: #ddd;
    min-width: 200px;
    width: 20%;
    position: relative;

    .bottom-section {
      bottom: 30px;
      position: absolute;
      width: 100%;
    }
  }
}

.d-flex {
  display: flex;
}
</style>
