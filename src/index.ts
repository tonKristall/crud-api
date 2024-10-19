import * as process from 'process';
import { createServer } from 'http';
import { DEFAULT_PORT } from './consts';
import 'dotenv/config';
import { requestListener } from './services/requestListener';

const PORT: number = Number(process.env.PORT) || DEFAULT_PORT;

export const server = createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
