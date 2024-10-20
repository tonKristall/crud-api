import { IncomingMessage, ServerResponse } from 'http';
import { errorsHandler } from '../errorsHandler';
import { USER_ERRORS } from './consts';
import { parseData } from '../../utils';
import { getUser, updateUser } from '../../db/users/db';

export const editUsersItem = async (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  url: string,
  id: string,
) => {
  const user = await getUser(id);

  if (!user) {
    errorsHandler(USER_ERRORS.FIND, res, method, url);
    return;
  }

  try {
    const { age, username, hobbies } = await parseData(
      req,
      errorsHandler.bind(null, USER_ERRORS.CREATE, res, method, url),
    );
    if (
      age &&
      typeof age === 'number' &&
      username &&
      typeof username === 'string' &&
      hobbies &&
      Array.isArray(hobbies)
    ) {
      const user = { id, username, age, hobbies };
      await updateUser(user);
      res.end(JSON.stringify(user));
    } else {
      errorsHandler(USER_ERRORS.CREATE, res, method, url, {
        age,
        username,
        hobbies,
      });
    }
  } catch {}
};
