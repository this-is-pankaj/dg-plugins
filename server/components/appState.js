const axios = require("axios");
const demoAPI = 'https://dataguard.blob.core.windows.net/challenges/plugins/fe-challenge.json';
const appState = {
  allPluginsEnabled: true,
};

const initializeState = async () => {
  try {
    const { data: { data, errors } } = await axios.get(demoAPI);
    if(errors) {
      throw errors;
    }
    Object.assign(appState, data);
    return appState;
  } catch(exc) {
    throw exc;
  }
};
// Initailize the appState with the values already set
initializeState();

module.exports = appState;