import { createServer, request } from 'http';
import { cpus } from 'os';
import cluster from 'cluster';

export const balancer = (port: number) => {
  const workersCount = cpus().length;
  const workerPorts = Array.from(
    { length: workersCount },
    (_, i) => port + i + 1,
  );

  workerPorts.forEach((port) => {
    cluster.fork({ workerPort: String(port) });
  });

  let currentWorker = 0;

  const server = createServer((req, res) => {
    currentWorker = (currentWorker + 1) % workersCount;
    const workerPort = port + currentWorker + 1;

    const options = {
      port: workerPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const workerRequest = request(options, (workerResponse) => {
      workerResponse.pipe(res);
    });
    req.pipe(workerRequest);
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
