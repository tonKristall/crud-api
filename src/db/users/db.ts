import { readFile, writeFile } from 'fs/promises';
import { IUser } from './types';

const filePath = './src/db/users/data.json';

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return (JSON.parse(data) || []) as IUser[];
  } catch (error) {
    return [];
  }
};

export const getUser = async (id: string): Promise<IUser | undefined> => {
  const users = await getUsers();
  return users.find((user) => user.id === id);
};

export const addUser = async (user: IUser): Promise<void> => {
  try {
    const users = await getUsers();
    users.push(user);
    await writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (err) {}
};

export const updateUser = async (user: IUser): Promise<void> => {
  try {
    const users = await getUsers();
    const index = users.findIndex(({ id }) => id === user.id);
    users[index] = user;
    await writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (err) {}
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const users = await getUsers();
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    await writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (err) {}
};
