export const ENDPOINTS = {
  root: '',
  id: /^\/(((?!\/).)+)$/,
};

export const USER_ERRORS = {
  CREATE: {
    code: 400,
    message: 'User params invalid',
  },
  UUID: {
    code: 400,
    message: 'User UUID invalid',
  },
  FIND: {
    code: 404,
    message: 'User not found',
  },
};
