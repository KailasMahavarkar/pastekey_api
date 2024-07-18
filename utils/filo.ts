import redisClient from "./rediser";

// filo implementation of queue using LIST in redis
const filoQueue = (
	key = "",
	maxsize = 1000,
	opts = {
		unique: false,
	}
) => {
	const push = async (value) => {
		let val;
		// check if typeof value is object if object then stringify it
		if (typeof value === "object") {
			val = JSON.stringify(value);
		} else {
			val = value;
		}

		try {
			if (opts.unique) {
				// remove previous value if exists
				await redisClient.lRem(key, 0, val);
			}

			// push the new element
			await redisClient.lPush(key, val);

			// trim if the list is too long
			// time complexity O(1)
			await redisClient.lTrim(key, 0, maxsize);
			return 0;
		} catch (error) {
			return -1;
		}
	};

	const pop = async () => {
		try {
			if ((await redisClient.lLen(key)) > 0) {
				return await redisClient.rPop(key);
			}
			return "0";
		} catch (error) {
			return "-1";
		}
	};

	return {
		push,
		pop,
	};
};

export const logQueue = filoQueue("pastekey:logs[main]", 2000);
export const logEmail = filoQueue("pastekey:logs[email]", 2000);

export default filoQueue;
