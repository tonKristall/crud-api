import { ServerResponse } from 'http';
import { users } from '../../db/users';
import { errorsHandler } from '../errorsHandler';
import { USER_ERRORS } from './consts';
import { REGEX } from '../consts';

export const getUsersItem = (
  res: ServerResponse,
  method: string,
  url: string,
  id?: string,
) => {
  if (id && id.match(REGEX.UUID)) {
    const user = users.find((user) => user.id === id);
    user
      ? res.end(JSON.stringify(user))
      : errorsHandler(USER_ERRORS.FIND, res, method, url);
  } else {
    errorsHandler(USER_ERRORS.UUID, res, method, url);
  }
};
