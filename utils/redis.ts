import { RedisClientType } from "redis";
import myredis from "./rediser";

type NX = boolean;
type XX = boolean;

const redisFunc = (key: string, redisInstance?: RedisClientType) => {
	const redis = redisInstance || myredis;
	let delimiter = ".X.";
	const xhSet = async (
		subkey: string,
		value: string,
		expiry: number,
		options?: {
			exists?: "NX" | "XX";
			delimiter?: string;
		}
	) => {
		const expireAt = (Date.now() + expiry).toString();
		delimiter = options?.delimiter || ".X.";
		const fvalue = value + delimiter + expireAt;

		if (options?.exists === "NX") {
			if (!redis.hExists(key, subkey)) {
				return await redis.HSET(key, subkey, fvalue);
			}
		} else if (options?.exists === "XX") {
			if (await redis.hExists(key, subkey)) {
				return await redis.HSET(key, subkey, fvalue);
			}
		}
		return await redis.HSET(key, subkey, fvalue);
	};

	const xhGet = async (subkey: string) => {
		// check for expiry
		const result = (await redis.HGET(key, subkey)) || "";

		if (!result) {
			return {
				value: -1,
				timeRemaining: -1,
			};
		}

		const [value, expiry] = String(result).split(delimiter);
		const timeDiff = Number(expiry) - Date.now();

		if (timeDiff <= 0) {
			await redis.HDEL(key, subkey);
			return {
				value: -1,
				timeRemaining: -1,
			};
		}
		return {
			value: value,
			timeRemaining: timeDiff,
		};
	};

	const hSet = async (subkey: string, value: string) => {
		return await redis.HSET(key, subkey, value);
	};

	const hGet = async (subkey: string) => {
		return (await redis.HGET(key, subkey)) || -1;
	};

	const hDel = async (subkey: string) => {
		return await redis.HDEL(key, subkey);
	};



	// lists
	const lPush = async (value: string) => {
		return await redis.LPUSH(key, value);
	};

	// lpop
	const lPop = async () => {
		return await redis.LPOP(key);
	};

	// llen
	const lLen = async () => {
		return await redis.LLEN(key);
	};

	return {
		xhSet: xhSet,
		xhGet: xhGet,
		hSet: hSet,
		hGet: hGet,
		hDel: hDel,
		raw: redis,

        // lists
        lPush: lPush,
        lPop: lPop,
        lLen: lLen,
	};
};

export const rawRedis = myredis;
export const ipRedis = redisFunc("pastekey:ip");
export const pasteRedis = redisFunc("pastekey:pastes");
export const tokenRedis = redisFunc("pastekey:tokens");
export const pasteUpdateRedis = redisFunc("pastekey:pastes:update");

export default redisFunc;
