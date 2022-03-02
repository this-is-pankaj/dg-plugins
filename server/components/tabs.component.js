const appState = require("./appState");

const methods = {}

methods.getAllTabsInfo = () => {
  const { tabs, tabdata, allPluginsEnabled, plugins } = appState;
  const tabsFlatten = {};
  for (let i = 0; i < tabs.length; i += 1) {
    const { title, icon } = tabdata[tabs[i]];
    tabsFlatten[tabs[i]] = {
      id: tabs[i],
      title,
      icon,
    };
  }
  return { tabs: tabsFlatten, tabdata, allPluginsEnabled, plugins };
};

methods.updateTabContent = ({ tabId, pluginId, flag }) => {
  const tabContent = appState.tabdata[tabId];
  // If the flag is true, it means we need to activate
  // else deactivate
  if (flag) {
    // Check for the index of plugin to be removed from inactive list
    const idx = tabContent.inactive.indexOf(pluginId);
    tabContent.active.push(pluginId);
    // Make sure that the list is unique
    tabContent.active = [...new Set(tabContent.active)];
    // Only if the id was inactive, remove from the list
    if(idx>-1) {
      tabContent.inactive.splice(idx, 1);
    }
  } else {
    // Remove from active directory and add to inactive ones
    const idx = tabContent.active.indexOf(pluginId);
    tabContent.inactive.push(pluginId);
    // Make sure that the list is unique
    tabContent.inactive = [...new Set(tabContent.inactive)];
    // Only if the id was active, remove from the list
    if(idx>-1) {
      tabContent.active.splice(idx, 1);
    }
  }
  return appState.tabdata;
};

methods.updateAppState = ({ flag }) => {
  appState.allPluginsEnabled = flag;
  return flag; 
}

module.exports = methods;