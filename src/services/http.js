import axios from 'axios';
import includes from 'lodash/includes';
import config from '../../config';
import CONSTANTS from '../constants';

const isProd = process.env.NODE_ENV === 'production';
const baseApiURL = isProd
  ? ''
  : `${window.location.protocol}//${window.location.hostname}:${config.dev.apiPort}`;

/**
 * Http request service.
 *
 * options = {
 *   api,     // API request
 *   method,  // 'get', 'post', 'put' or 'delete'
 *   path,
 *   data,
 *   headers,
 * }
 *
 * @param {object} options - Request options
 */
export default function httpRequest(options) {
  const method = includes(CONSTANTS.ALLOWED_HTTP_METHODS, options.method)
    ? options.method
    : 'get';
  const url = options.api ? baseApiURL + options.path : options.path;
  const data = options.data;
  const opts = {
    method,
    url,
    data,
  };
  if (options.headers) opts.headers = options.headers;

  return axios(opts);
}
