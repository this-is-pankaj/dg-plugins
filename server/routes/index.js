const express = require('express');
const appRouter = express.Router();
const tabsController = require('../controller/tabs.controller');

appRouter.get('/tabs', tabsController.getAllTabs);
appRouter.put('/tab/:tabId', tabsController.udpatePluginStatus);
appRouter.put('/app', tabsController.updateAppStatus);

module.exports = appRouter;