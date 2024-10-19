import { ERRORS } from './consts';
import { ServerResponse } from 'http';

export const errorsHandler = (
  { code, message }: (typeof ERRORS)[keyof typeof ERRORS],
  res: ServerResponse,
  method?: string,
  url?: string,
) => {
  res.statusCode = code;
  res.end(message);
  console.error(`${message}: ${method} ${url}`);
};
