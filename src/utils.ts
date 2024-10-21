import { Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { IncomingMessage } from 'http';

export const parseData = async (
  req: IncomingMessage,
  onError: (...args: unknown[]) => void,
) => {
  let data = '';
  try {
    const writeStream = new Writable({
      write(chunk, _, callback) {
        data += chunk.toString();
        callback();
      },
    });
    await pipeline(req, writeStream);
    return JSON.parse(data);
  } catch {
    onError(data);
    throw new Error();
  }
};
