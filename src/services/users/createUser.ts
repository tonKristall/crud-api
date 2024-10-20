import { v4 as uuid } from 'uuid';
import { users } from '../../db/users';
import { IncomingMessage, ServerResponse } from 'http';
import { USER_ERRORS } from './consts';
import { errorsHandler } from '../errorsHandler';
import { parseData } from '../../utils';

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  url: string,
) => {
  const id = uuid();
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
      users.push(user);
      res.statusCode = 201;
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
