import cookies from 'cookies-js';
import jsonapiSerializer from 'jsonapi-serializer';
import rs from 'jsrsasign';
import get from 'lodash/get';
import constants from '../constants';
import httpRequest from '../services/http';

const isProd = process.env.NODE_ENV === 'production';
const JSONAPISerializer = jsonapiSerializer.Serializer;

function apiRequest(options) {
  const headers = options.headers || { 'Content-Type': 'application/vnd.api+json' };
  const serializerOpts = { attributes: options.attributes };
  const api = true;
  const data = new JSONAPISerializer('users', serializerOpts).serialize(options.data);
  const method = options.method;
  const path = options.path;
  const opts = {
    api,
    data,
    headers,
    method,
    path,
  };

  return httpRequest(opts);
}

export default {
  user: null,

  login(email, password) {
    if (this.loggedIn()) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    const options = {
      attributes: ['email', 'password'],
      data: { email, password },
      method: constants.LOGIN_METHOD,
      path: constants.LOGIN_PATH,
    };

    return new Promise((resolve, reject) => {
      apiRequest(options).then((res) => {
        if (res.data) {
          const optsCookies = {
            secure: isProd,
            expires: new Date(res.data.expiry * 1000),
          };

          cookies.set('token', res.data.token, optsCookies);
          this.user = res.data.user;
          resolve();
        }
      }).catch((err) => {
        if (err.response) {
          reject(get(err.response, 'data.errors'));
        } else {
          reject(err);
        }
      });
    });
  },

  logout() {
    const token = this.getToken();
    const options = {
      attributes: ['email'],
      data: {},
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
      method: constants.LOGOUT_METHOD,
      path: constants.LOGOUT_PATH,
    };

    return new Promise((resolve, reject) => {
      if (!this.user) reject();

      apiRequest(options).then((res) => {
        if (res.data) {
          this.user = null;
          cookies.expire('token');
          resolve();
        }
      }).catch((err) => {
        reject(err);
      });
    });
  },

  loggedIn() {
    return !!cookies.get('token');
  },

  getToken() {
    return cookies.get('token');
  },

  getTokenPayload() {
    const jwt = this.getToken();
    if (jwt) {
      return rs.jws.JWS.readSafeJSONString(rs.b64utoutf8(jwt.split('.')[1]));
    }
    return null;
  },

  recoverPassword(email) {
    const options = {
      attributes: ['email'],
      data: { email },
      method: constants.RECOVER_PASSWORD_METHOD,
      path: constants.RECOVER_PASSWORD_PATH,
    };

    return new Promise((resolve, reject) => {
      apiRequest(options).then((res) => {
        resolve(res);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  },

  resendVerification(email) {
    const options = {
      attributes: ['email'],
      data: { email },
      method: constants.RESEND_VERIFICATION_METHOD,
      path: constants.RESEND_VERIFICATION_PATH,
    };

    return new Promise((resolve, reject) => {
      apiRequest(options).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  setUser() {
    const payload = this.getTokenPayload();
    if (payload) {
      this.user = {
        id: payload.user_id,
        displayName: payload.name,
      };
    }
    return;
  },

  verify(email, token) {
    const options = {
      attributes: ['email', 'token'],
      data: { email, token },
      method: constants.USER_VERIFY_METHOD,
      path: constants.USER_VERIFY_PATH,
    };

    return new Promise((resolve, reject) => {
      apiRequest(options).then((res) => {
        resolve(res);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  },
};
