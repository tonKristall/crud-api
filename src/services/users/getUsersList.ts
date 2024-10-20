import { users } from '../../db/users';
import { ServerResponse } from 'http';

export const getUsersList = (res: ServerResponse) => {
  res.end(JSON.stringify(users));
};
