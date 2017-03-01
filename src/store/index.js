import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import users from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    users,
  },
});

export default store;
