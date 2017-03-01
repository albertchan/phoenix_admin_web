import Vue from 'vue';
import cookies from 'cookies-js';
import constants from '../constants';
import httpRequest from './http';

/**
 * i18n service
 *
 * @param {object} options - Locale options
 */
export default {
  init() {
    const lang = cookies.get('locale') || constants.LOCALE_DEFAULT;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const opts = {
      method: 'get',
      path: `/static/locales/${lang}.json`,
      headers,
    };

    return new Promise((resolve /* , reject */) => {
      Vue.locale(lang, () => httpRequest(opts).then((res) => {
        if (Object.keys(res.data).length === 0) {
          return Promise.reject(new Error('Invalid locale JSON'));
        }
        return Promise.resolve(res.data);
      }).catch((err) => {
        console.error(err);
        return Promise.reject();
      }), () => {
        Vue.config.lang = lang;
        Vue.config.fallbackLang = constants.LOCALE_DEFAULT;
        resolve(lang);
      });
    });
  },

  setLocale() {
  },
};
