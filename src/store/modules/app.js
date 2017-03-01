import { app as types } from '../mutation-types';

// initial state
const initialState = {
  isDrawerOpen: false,
};

// getters
const getters = {
  isDrawerOpen: state => state.isDrawerOpen,
};

// actions
const actions = {
  toggleDrawer({ commit }) {
    commit(types.TOGGLE_DRAWER);
  },
};

// mutations
/* eslint-disable no-param-reassign */
const mutations = {
  [types.TOGGLE_DRAWER](state) {
    state.isDrawerOpen = !state.isDrawerOpen;
  },
};
/* eslint-enable no-param-reassign */

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
