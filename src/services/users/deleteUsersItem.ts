import { ServerResponse } from 'http';
import { errorsHandler } from '../errorsHandler';
import { USER_ERRORS } from './consts';
import { deleteUser, getUser } from '../../db/users/db';

export const deleteUsersItem = async (
  res: ServerResponse,
  method: string,
  url: string,
  id: string,
) => {
  const user = await getUser(id);
  if (user) {
    await deleteUser(id);
    res.statusCode = 204;
    res.end();
  } else {
    errorsHandler(USER_ERRORS.FIND, res, method, url);
  }
};
