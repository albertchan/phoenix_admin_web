// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import I18n from './services/i18n';
import App from './App';
import auth from './api/auth';
import router from './router';
import store from './store';

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// Install plugins
Vue.use(VueI18n);
Vue.use(VeeValidate);

// Check for auth user
if (!auth.user) {
  auth.setUser();
}

// Set up i18n service
const app = I18n.init().then(() => new Vue({
  el: '#app',
  router,
  store,
  ...App,

  // Inject global data
  data: {},

  // Inject global methods
  methods: {},
}));

export { app, router, store };
