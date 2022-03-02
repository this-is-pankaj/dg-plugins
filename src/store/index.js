import Vue from 'vue';
import Vuex from 'vuex';
import handlers from '../utils/handlers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabs: {},
    content: {},
    plugins: {},
    appPluginsEnabled: true,
  },
  mutations: {
    SET_TABS(state, tabs) {
      state.tabs = tabs;
    },
    SET_CONTENTS(state, data) {
      state.content = data;
    },
    SET_PLUGINS(state, plugins) {
      state.plugins = { ...plugins };
    },
    SET_ALL_PLUGIN_STATE(state, flag) {
      state.appPluginsEnabled = !!flag;
    },
  },
  actions: {
    async FETCH_APP_INFO(context) {
      try {
        const {
          data: {
            tabs, tabdata, plugins, allPluginsEnabled,
          },
        } = await handlers.loadInitialData();
        context.commit('SET_TABS', tabs);
        context.commit('SET_CONTENTS', tabdata);
        context.commit('SET_PLUGINS', plugins);
        context.commit('SET_ALL_PLUGIN_STATE', allPluginsEnabled);
      } catch (exc) {
        // Log exception and leave the state unchanged
      }
    },
    FETCH_PLUGINS_FOR_ACTIVE_TAB(context, tabId) {
      return context.state.content[tabId];
    },
    async UPDATE_PLUGIN_STATUS(context, { flag, pluginId, tabId }) {
      try {
        // API to update the state of the plugin
        const { data } = await handlers.updatePluginStatus({
          flag,
          pluginId,
          tabId,
        });
        context.commit('SET_CONTENTS', data);
      } catch (exc) {
        // Log exception and leave the store values unchanged.
      }
    },
    async UPDATE_APP_STATUS(context, flag) {
      try {
        // API to update the state of the plugin
        const { data } = await handlers.updateAppStatus({
          flag,
        });
        context.commit('SET_ALL_PLUGIN_STATE', data.flag);
      } catch (exc) {
        // Log exception and leave the store values unchanged.
      }
    },
  },
  getters: {
    getTabs(state) {
      return state.tabs;
    },
    getPluginsForActiveTab(state) {
      return (tabId) => state.content[tabId];
    },
    getStateForPlugins(state) {
      return state.appPluginsEnabled;
    },
    FETCH_PLUGINS_INFO(state) {
      return (pluginId) => state.plugins[pluginId];
    },
  },
});
