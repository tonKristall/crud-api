import { IncomingMessage, ServerResponse } from 'http';
import { SERVICES, ERRORS } from './consts';
import { usersService } from './users';
import { errorsHandler } from './errorsHandler';

export const requestListener = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    if (!req.url) {
      errorsHandler(ERRORS.SERVICE_NOT_FOUND, res, req.method, req.url);
      throw new Error(ERRORS.SERVICE_NOT_FOUND.message);
    }

    const url = req.url
      .toLowerCase()
      .split('/')
      .filter((part) => !!part)
      .join('/');
    const method = req.method?.toLowerCase() || '';

    if (url.startsWith(SERVICES.USERS)) {
      await usersService(req, res, method, url);
    } else {
      errorsHandler(ERRORS.SERVICE_NOT_FOUND, res, req.method, req.url);
    }
  } catch (error) {
    errorsHandler(ERRORS.SERVER_ERROR, res, req.method, req.url);
    console.error(error);
  }
};
