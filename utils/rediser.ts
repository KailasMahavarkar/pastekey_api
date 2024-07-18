import { createClient as clientMaker, RedisClientType } from "redis";
import env from '../env';

const REDIS_CONFIG = env.REDIS_CONFIG;

const configSelector = (MODE: "dev" | "prod") => {
	if (MODE === "dev") {
		return REDIS_CONFIG.dev;
	}
	return REDIS_CONFIG.prod;
};

export const redisConfig = REDIS_CONFIG.dev;

type redisOptionsType = {
	url: string;
	password: string;
};

const redisOptions = {
	url: `redis://${redisConfig?.HOST}:${redisConfig?.PORT}`,
	password: redisConfig?.PASSWORD,
};

const redisOptionsMaker = (
	config = { host: "", port: 0, password: "" }
): redisOptionsType => {
	return {
		url: `redis://${config.host}:${config.port}`,
		password: config.password,
	};
};

interface customRedisType {
	createClient: () => RedisClientType;
	close: () => void;
}

export const redisClientMaker = (
	redisOptions: redisOptionsType
): customRedisType => {
	// ts-ignore
	let _redisClient: RedisClientType;
	const createClient = (): RedisClientType => {
		if (!_redisClient) {
			_redisClient = clientMaker(redisOptions as any);
			_redisClient.on("error", (err) =>
				console.log("Redis Client Error", err)
			);
			_redisClient.connect();
		}

		return _redisClient;
	};

	const close = (): void => {
		try {
			_redisClient.disconnect();
		} catch (e) {
			console.log(e.message);
		}
	};
	return {
		createClient,
		close,
	};
};

export let devRedis: RedisClientType;
export let prodRedis: RedisClientType;
export let mainRedis: RedisClientType;
export let pasteRedis: RedisClientType;

// @ts-ignore
if (!devRedis) {
	const redisConfig = configSelector("dev");
	devRedis = redisClientMaker(
		redisOptionsMaker({
			host: (redisConfig.HOST as string) | "",
			port: Number(redisConfig?.PORT),
			password: redisConfig?.PASSWORD,
		})
	).createClient();
}

// @ts-ignore
if (!prodRedis) {
	const redisConfig = configSelector("prod");
	prodRedis = redisClientMaker(
		redisOptionsMaker({
			host: redisConfig?.HOST,
			port: Number(redisConfig?.PORT),
			password: redisConfig?.PASSWORD,
		})
	).createClient();
}



const modeRedis = env.MODE === 'dev' ? devRedis : prodRedis;


export default modeRedis;
