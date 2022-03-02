import Vue from 'vue';
import VueRouter from 'vue-router';
import PluginDetails from '../views/PluginDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:tabId',
    name: 'TabDetails',
    component: PluginDetails,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
