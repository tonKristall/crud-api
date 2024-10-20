import { ERRORS, METHODS, SERVICES } from '../consts';
import { IncomingMessage, ServerResponse } from 'http';
import { ENDPOINTS } from './consts';
import { errorsHandler } from '../errorsHandler';
import { getUsersList } from './getUsersList';
import { createUser } from './createUser';
import { getUsersItem } from './getUsersItem';

export const usersService = async (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  url: string,
) => {
  const endpoint = url.replace(SERVICES.USERS, '');
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
    case endpoint.match(ENDPOINTS.id)?.[0]:
      if (method === METHODS.GET) {
        getUsersItem(res, method, url, endpoint.match(ENDPOINTS.id)?.[1]);
      } else {
        errorsHandler(ERRORS.METHODS_NOT_SUPPORTED, res, method, url);
      }
      break;
    default:
      errorsHandler(ERRORS.SERVICE_NOT_FOUND, res, method, url);
      break;
  }
};
