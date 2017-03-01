import jsonapiSerializer from 'jsonapi-serializer';
import get from 'lodash/get';
import users from '../../api/users';
import { users as types } from '../mutation-types';

// JSON API deserializer
const JSONAPIDeserializer = jsonapiSerializer.Deserializer;
const deserializerOpts = { keyForAttribute: 'camelCase' };

// initial state
const initialState = {
  user: null,
  users: null,
};

// getters
const getters = {
  user: state => state.user,
  users: state => state.users,
};

// actions
const actions = {
  createUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      users.create(user).then((res) => {
        if (res.data) {
          new JSONAPIDeserializer().deserialize(res.data, (err, item) => {
            resolve(item);
          });
        }
      }).catch((error) => {
        if (error.response) {
          reject(get(error.response, 'data.errors'));
        }
        reject(error);
      });
    });
  },

  showUser({ commit }, id) {
    users.fetch(id).then((res) => {
      if (res.data) {
        new JSONAPIDeserializer(deserializerOpts).deserialize(res.data, (err, item) => {
          commit(types.RECEIVE_ITEM, item);
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  },

  updateUser({ commit }, options) {
    return new Promise((resolve, reject) => {
      users.update(options).then((res) => {
        if (res.data) {
          new JSONAPIDeserializer(deserializerOpts).deserialize(res.data, (err, item) => {
            commit(types.RECEIVE_ITEM, item);
            resolve(item);
          });
        }
      }).catch((error) => {
        if (error.response) {
          reject(get(error.response, 'data.errors'));
        }
        reject(error);
      });
    });
  },

  usersFetchAll({ commit }) {
    users.fetchAll().then((res) => {
      if (res.data) {
        new JSONAPIDeserializer().deserialize(res.data, (err, collection) => {
          commit(types.RECEIVE_ALL, collection);
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  },

  usersFetchPage({ commit }) {
    users.fetchAll().then((res) => {
      if (res.data) {
        commit(types.RECEIVE_PAGE, res.data);
      }
    }).catch((err) => {
      console.error(err);
    });
  },
};

// mutations
/* eslint-disable no-param-reassign */
const mutations = {
  [types.RECEIVE_ALL](state, collection) {
    state.users = collection;
  },

  [types.RECEIVE_ITEM](state, item) {
    state.user = item;
  },

  [types.RECEIVE_PAGE](state, json) {
    new JSONAPIDeserializer().deserialize(json, (err, collection) => {
      state.users = {};
      state.users.data = collection;
      state.users.meta = json.meta;
      state.users.links = json.links;
    });
  },
};
/* eslint-enable no-param-reassign */

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
