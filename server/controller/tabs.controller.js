const { getAllTabsInfo, updateTabContent, updateAppState } = require("../components/tabs.component");

const methods = {};

methods.getAllTabs = async (req, res) => {
  try {
    // Fetch the list of tabs
    const tabsInfo = getAllTabsInfo();
    res.status(200).send(tabsInfo);
  } catch(exc) {
    res.status(500).send('Internal error');
  }
};

methods.udpatePluginStatus = async (req, res) => {
  try {
    const { params: { tabId }, body: { pluginId, flag } } = req;
    const tabsInfo = updateTabContent({ tabId, flag, pluginId});
    res.status(200).send(tabsInfo);
  } catch(exc) {
    res.status(500).send('Internal error');
  }
};

methods.updateAppStatus = async (req, res) => {
  try {
    const { body: { flag } } = req;
    await updateAppState(flag);
    res.status(200).send(flag);
  } catch(exc) {
    res.status(500).send('Internal error');
  }
};

module.exports = methods;