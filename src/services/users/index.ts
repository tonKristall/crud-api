import { ERRORS, METHODS, REGEX, SERVICES } from '../consts';
import { IncomingMessage, ServerResponse } from 'http';
import { ENDPOINTS, USER_ERRORS } from './consts';
import { errorsHandler } from '../errorsHandler';
import { getUsersList } from './getUsersList';
import { createUser } from './createUser';
import { getUsersItem } from './getUsersItem';
import { deleteUsersItem } from './deleteUsersItem';
import { editUsersItem } from './editUsersItem';

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
      const id = endpoint.match(ENDPOINTS.id)?.[1];
      if (!(id && id.match(REGEX.UUID))) {
        errorsHandler(USER_ERRORS.UUID, res, method, url);
      } else if (method === METHODS.GET) {
        getUsersItem(res, method, url, id);
      } else if (method === METHODS.DELETE) {
        deleteUsersItem(res, method, url, id);
      } else if (method === METHODS.PUT) {
        await editUsersItem(req, res, method, url, id);
      } else {
        errorsHandler(ERRORS.METHODS_NOT_SUPPORTED, res, method, url);
      }
      break;
    default:
      errorsHandler(ERRORS.SERVICE_NOT_FOUND, res, method, url);
      break;
  }
};
