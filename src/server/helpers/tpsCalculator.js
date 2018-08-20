import { promisify } from "es6-promisify";
import redis from "redis";
import config from "../../../server-config.json";

const redisClient = redis.createClient(config.redis);
const zRangeByScore = promisify(redisClient.zrangebyscore.bind(redisClient));

const STORAGE_KEY = `nano-control-panel/${config.redisNamesapce ||
  "default"}/networkTps`;

const KNOWN_PERIODS = {
  "1m": 60 * 1000,
  "5m": 60 * 5 * 1000,
  "15m": 60 * 15 * 1000,
  "30m": 60 * 30 * 1000,
  "60m": 60 * 60 * 1000,
  "1hr": 60 * 60 * 1000,
  "6hr": 60 * 60 * 6 * 1000,
  "12hr": 60 * 60 * 12 * 1000,
  "24hr": 60 * 60 * 24 * 1000,
  "1d": 60 * 60 * 24 * 1000,
  "1w": 60 * 60 * 24 * 7 * 1000
};

const tpsCalculator = async period => {
  if (!KNOWN_PERIODS[period])
    throw new Error("Unknown time period or out of allowed range");

  const now = new Date().getTime();
  const lowBound = now - KNOWN_PERIODS[period];

  const blockCounts = await zRangeByScore(STORAGE_KEY, lowBound, now);
  const startCount = blockCounts[0];
  const endCount = blockCounts[blockCounts.length - 1];

  return (endCount - startCount) / (KNOWN_PERIODS[period] / 1000.0);
};

export default tpsCalculator;
