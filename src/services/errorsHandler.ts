import { ServerResponse } from 'http';

export const errorsHandler = (
  { code, message }: { code: number; message: string },
  res: ServerResponse,
  ...logParams: Array<unknown>
) => {
  res.statusCode = code;
  res.end(message);
  console.error(`${message}: ${JSON.stringify(logParams)}`);
};
