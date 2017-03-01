import jsonapiSerializer from 'jsonapi-serializer';
import auth from '../api/auth';
import constants from '../constants';
import httpRequest from '../services/http';

const JSONAPISerializer = jsonapiSerializer.Serializer;

function getAuthHeaders() {
  return {
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${auth.getToken()}`,
  };
}

export default {
  fetch(id) {
    const api = true;
    const method = constants.USER_SHOW_METHOD;
    const path = constants.USER_SHOW_PATH + id;
    const data = {}; // required by Axios
    const headers = getAuthHeaders();
    const opts = {
      api,
      data,
      headers,
      method,
      path,
    };

    return httpRequest(opts);
  },

  fetchAll() {
    const api = true;
    const method = constants.USER_INDEX_METHOD;
    const path = constants.USER_INDEX_PATH;
    const data = {}; // required by Axios
    const headers = getAuthHeaders();
    const opts = {
      api,
      data,
      headers,
      method,
      path,
    };

    return httpRequest(opts);
  },

  create(user) {
    const api = true;
    const method = constants.USER_CREATE_METHOD;
    const path = constants.USER_CREATE_PATH;
    const serializerOpts = { attributes: ['email', 'name', 'password'] };
    const data = new JSONAPISerializer('users', serializerOpts).serialize(user);
    const headers = getAuthHeaders();
    const opts = {
      api,
      data,
      headers,
      method,
      path,
    };

    return httpRequest(opts);
  },

  update(options) {
    const api = true;
    const method = constants.USER_UPDATE_METHOD;
    const path = constants.USER_UPDATE_PATH + options.id;
    const serializerOpts = {
      attributes: ['email', 'name', 'last_login', 'verified_at', 'verified_sent_at'],
    };
    const data = new JSONAPISerializer('users', serializerOpts).serialize(options.data);
    const headers = getAuthHeaders();
    const opts = {
      api,
      data,
      headers,
      method,
      path,
    };

    return httpRequest(opts);
  },

  register(user) {
    const api = true;
    const method = constants.USER_REGISTER_METHOD;
    const path = constants.USER_REGISTER_PATH;
    const serializerOpts = { attributes: ['email', 'name', 'password', 'password_confirmation'] };
    const data = new JSONAPISerializer('users', serializerOpts).serialize(user);
    const headers = { 'Content-Type': 'application/vnd.api+json' };
    const opts = {
      api,
      data,
      headers,
      method,
      path,
    };

    return httpRequest(opts);
  },
};
