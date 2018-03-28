import { promisify } from 'es6-promisify'
import redis from 'redis'
import config from '../../config.json'

let redisClient, redisGet, redisSet;
if (config.redis) {
  redisClient = redis.createClient(config.redis);
  redisGet = promisify(redisClient.get.bind(redisClient));
  redisSet = promisify(redisClient.set.bind(redisClient));
}

const redisFetch = async (key, expire, func) => {
  if (!redisClient) return func();
  const namespacedKey = `nano-control-panel/${key}`;
  const resp = await redisGet(namespacedKey);
  if (resp === null) {
    const result = await Promise.resolve(func());
    redisSet(namespacedKey, JSON.stringify(result), 'EX', expire);
    return result;
  } else {
    return JSON.parse(resp);
  }
}

export default redisFetch
