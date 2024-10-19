import { ERRORS, METHODS, PATH } from '../consts';
import { users } from '../../db/users';
import { ServerResponse } from 'http';
import { ENDPOINTS } from './consts';
import { errorsHandler } from '../errorsHandler';

export const usersService = (
  url: string,
  method: string,
  res: ServerResponse,
) => {
  const endpoint = url.replace(PATH.USERS, '');
  switch (endpoint) {
    case ENDPOINTS.root:
      res.end(JSON.stringify(users));
      break;
    case METHODS.POST:
      res.end('POST!');
      break;
    case METHODS.PUT:
      res.end('PUT!');
      break;
    case METHODS.DELETE:
      res.end('DELETE!');
      break;
    default:
      errorsHandler(ERRORS.METHODS_NOT_SUPPORTED, res, method, url);
      break;
  }
};
