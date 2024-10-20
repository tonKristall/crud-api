import { createServer } from 'http';
import cluster from 'cluster';
import { requestListener } from './services/requestListener';
import process from 'process';

export const worker = (port: number) => {
  const type = cluster.isPrimary ? 'Server' : `Worker #${process.pid}`;
  const server = createServer(async (req, res) => {
    await requestListener(req, res);
    if (cluster.isWorker) {
      req.on('end', () => {
        console.log(
          `Execute request worker #${process.pid} on port ${port}: ${req.method} ${req.url} `,
        );
      });
    }
  });
  server.listen(port, () => {
    console.log(`${type} listening on port ${port}`);
  });
};
