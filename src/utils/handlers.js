import axios from 'axios';

export default {
  loadInitialData() {
    const url = '/api/dg-apps/tabs';
    return axios.get(url);
  },
  updatePluginStatus(info) {
    const { tabId, pluginId, flag } = info;
    return axios({
      method: 'PUT',
      url: `/api/dg-apps/tab/${tabId}`,
      data: {
        pluginId,
        flag,
      },
    });
  },
  updateAppStatus(flag) {
    return axios({
      method: 'PUT',
      url: '/api/dg-apps/app',
      data: {
        flag,
      },
    });
  },
};
