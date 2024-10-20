import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../../db/users';
import { errorsHandler } from '../errorsHandler';
import { USER_ERRORS } from './consts';
import { parseData } from '../../utils';

export const editUsersItem = async (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  url: string,
  id: string,
) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
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
      users[userIndex] = user;
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
