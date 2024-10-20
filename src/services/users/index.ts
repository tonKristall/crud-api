import { ERRORS, METHODS, PATH } from '../consts';
import { IncomingMessage, ServerResponse } from 'http';
import { ENDPOINTS } from './consts';
import { errorsHandler } from '../errorsHandler';
import { getUsersList } from './getUsersList';
import { createUser } from './createUser';

export const usersService = async (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  url: string,
) => {
  const endpoint = url.replace(PATH.USERS, '');
  switch (endpoint) {
    case ENDPOINTS.root:
      if (method === METHODS.GET) {
        getUsersList(res);
      } else if (method === METHODS.POST) {
        await createUser(req, res, method, url);
      } else {
        errorsHandler(ERRORS.METHODS_NOT_SUPPORTED, res, method, url);
      }
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
