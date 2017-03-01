const apiPath = '/api';

module.exports = {
  // Endpoints
  LOGIN_METHOD: 'post',
  LOGIN_PATH: `${apiPath}/users/login`,
  LOGOUT_METHOD: 'post',
  LOGOUT_PATH: `${apiPath}/users/logout`,
  RECOVER_PASSWORD_METHOD: 'post',
  RECOVER_PASSWORD_PATH: `${apiPath}/users/recover_password`,
  RESEND_VERIFICATION_METHOD: 'post',
  RESEND_VERIFICATION_PATH: `${apiPath}/users/resend_verification`,
  USER_INDEX_METHOD: 'get',
  USER_INDEX_PATH: `${apiPath}/users`,
  USER_CREATE_METHOD: 'post',
  USER_CREATE_PATH: `${apiPath}/users`,
  USER_REGISTER_METHOD: 'post',
  USER_REGISTER_PATH: `${apiPath}/users/register`,
  USER_SHOW_METHOD: 'get',
  USER_SHOW_PATH: `${apiPath}/users/`,
  USER_UPDATE_METHOD: 'put',
  USER_UPDATE_PATH: `${apiPath}/users/`,
  USER_VERIFY_METHOD: 'post',
  USER_VERIFY_PATH: `${apiPath}/users/verify`,

  // Supported languages
  LOCALE_DEFAULT: 'en-US',
  LOCALES: [
    { id: 'en-US', label: 'English' },
    { id: 'zh-TW', label: '繁體中文' },
  ],

  DATA_TYPE_USER: 'user',
  DATA_TYPE_ROLE: 'role',

  // User roles
  ROLE_NAME_SUPER_ADMIN: 'super_admin',
  ROLE_NAME_ADMIN: 'super_admin',
  ROLE_NAME_EDITOR: 'editor',
  ROLE_NAME_AUTHOR: 'author',

  ALLOWED_HTTP_METHODS: ['get', 'post', 'put', 'delete'],

  // Notification types
  NOTIFICATION: {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARN: 'warn',
  },
};
