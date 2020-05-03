import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import redisConfig from './redis';

export default new Brute(
  new BruteRedis({
    host: redisConfig.host,
    port: redisConfig.port,
  })
);
