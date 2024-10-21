import { ServerResponse } from 'http';
import { errorsHandler } from '../errorsHandler';
import { USER_ERRORS } from './consts';
import { getUser } from '../../db/users/db';

export const getUsersItem = async (
  res: ServerResponse,
  method: string,
  url: string,
  id: string,
) => {
  const user = await getUser(id);
  user
    ? res.end(JSON.stringify(user))
    : errorsHandler(USER_ERRORS.FIND, res, method, url);
};
