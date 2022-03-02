<template>
  <div class="tab-details">
    <div class="plugin-list">
      <card
        v-for="(pInfo,id) in plugins"
        :key="id"
        :info="pInfo"
        class="plugin-card"
        :disabled="!pluginsEnabled || pInfo.disabled"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Card from '../components/Card.vue';

export default {
  components: { Card },
  name: 'Home',
  watch: {
    $route({ params: { tabId } }) {
      this.tabId = tabId;
      this.fetchContent();
    },
  },
  mounted() {
    this.fetchContent();
  },
  data() {
    return {
      tabId: this.$route.params.tabId,
    };
  },
  computed: {
    ...mapGetters({
      tabDetails: 'getPluginsForActiveTab',
      getPluginInfo: 'FETCH_PLUGINS_INFO',
      pluginsEnabled: 'getStateForPlugins',
    }),
    plugins() {
      try {
        const listOfPlugins = {};
        const { active, inactive, disabled } = this.tabDetails(this.tabId);

        active.map((pid) => {
          if (!listOfPlugins[pid]) {
            listOfPlugins[pid] = {
              id: pid,
              content: this.getPluginInfo(pid),
            };
          }
          listOfPlugins[pid] = {
            ...listOfPlugins[pid],
            isActive: true,
          };
          return true;
        });
        inactive.map((pid) => {
          if (!listOfPlugins[pid]) {
            listOfPlugins[pid] = {
              id: pid,
              content: this.getPluginInfo(pid),
            };
          }
          listOfPlugins[pid] = {
            ...listOfPlugins[pid],
            isActive: false,
          };
          return true;
        });
        disabled.map((pid) => {
          if (!listOfPlugins[pid]) {
            listOfPlugins[pid] = {
              id: pid,
              content: this.getPluginInfo(pid),
            };
          }
          listOfPlugins[pid] = {
            ...listOfPlugins[pid],
            disabled: true,
          };
          return true;
        });
        return listOfPlugins;
      } catch (exc) {
        return {};
      }
    },
  },
  methods: {
    ...mapActions({
      getContent: 'FETCH_PLUGINS_FOR_ACTIVE_TAB',
    }),
    async fetchContent() {
      this.plugins = await this.getContent(this.tabId);
    },
  },
};
</script>

<style lang="scss" scoped>
  .plugin-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .plugin-card {
      margin: 5px 0;
    }
  }
</style>
