import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

import redisConfig from './redis';

export default new RateLimit({
  store: new RateLimitRedis({
    client: redis.createClient({
      host: redisConfig.host,
      port: redisConfig.port,
    }),
  }),
  windowMs: process.env.WINDOW_MS,
  max: process.env.MAX_ATTEMPTS,
});
