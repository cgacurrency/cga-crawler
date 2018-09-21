import { promisify } from "es6-promisify";
import _ from "lodash";
import redis from "redis";
import config from "../../../server-config.json";

const redisClient = redis.createClient(config.redis);
const zcount = promisify(redisClient.zcount.bind(redisClient));
const zrevrange = promisify(redisClient.zrevrange.bind(redisClient));

const PAGE_SIZE = 100;
const frontiersKey = `nano-control-panel/${config.redisNamespace ||
  "default"}/sortedAccounts`;

export async function wealthDistribution(min, max) {
  return await zcount(frontiersKey, min, max);
}

export async function frontiers(page = 1) {
  const start = (page - 1) * PAGE_SIZE;
  const stop = start + PAGE_SIZE - 1;

  const total = await zcount(frontiersKey, "-inf", "+inf");
  const data = await zrevrange(frontiersKey, start, stop, "WITHSCORES");

  return {
    total,
    accounts: _.chunk(data, 2).map(d => ({ account: d[0], balance: d[1] }))
  };
}
