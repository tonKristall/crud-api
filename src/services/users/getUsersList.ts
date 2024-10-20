import { ServerResponse } from 'http';
import { getUsers } from '../../db/users/db';

export const getUsersList = async (res: ServerResponse) => {
  const users = await getUsers();
  res.end(JSON.stringify(users));
};
