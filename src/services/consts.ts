export const PATH = {
  USERS: 'api/users',
} as const;

export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;

export const ERRORS = {
  SERVICE_NOT_FOUND: {
    code: 404,
    message: 'Service not found',
  },
  METHODS_NOT_SUPPORTED: {
    code: 405,
    message: 'Methods not supported',
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Server error',
  },
} as const;
