import { ServerResponse } from 'http';
import { users } from '../../db/users';
import { errorsHandler } from '../errorsHandler';
import { USER_ERRORS } from './consts';

export const deleteUsersItem = (
  res: ServerResponse,
  method: string,
  url: string,
  id: string,
) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    users.splice(users.indexOf(user), 1);
    res.statusCode = 204;
    res.end();
  } else {
    errorsHandler(USER_ERRORS.FIND, res, method, url);
  }
};
