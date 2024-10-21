import process from 'process';
import { DEFAULT_PORT } from './consts';
import 'dotenv/config';
import { balancer } from './balancer';
import { worker } from './worker';
import cluster from 'cluster';

const { MODE } = process.env;

const port = cluster.isPrimary
  ? Number(process.env.PORT) || DEFAULT_PORT
  : Number(process.env.workerPort);
const isBalancer = MODE === 'balancer' && cluster.isPrimary;

isBalancer ? balancer(port) : worker(port);
