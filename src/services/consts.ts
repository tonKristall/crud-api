export const SERVICES = {
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
    message: { message: 'Service not found' },
  },
  METHODS_NOT_SUPPORTED: {
    code: 404,
    message: { message: 'Methods not supported' },
  },
  SERVER_ERROR: {
    code: 500,
    message: { message: 'Server error' },
  },
} as const;

export const REGEX = {
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
};
