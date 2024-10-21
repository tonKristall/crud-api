import { ServerResponse } from 'http';

export const errorsHandler = (
  { code, message }: { code: number; message: { message: string } },
  res: ServerResponse,
  ...logParams: Array<unknown>
) => {
  res.statusCode = code;
  res.end(JSON.stringify(message));
  console.error(`${message.message}: ${JSON.stringify(logParams)}`);
};
