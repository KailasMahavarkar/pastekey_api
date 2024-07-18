import dotenv from "dotenv";
dotenv.config({});

const env = {
	MODE: process.env.MODE,
	SERVER_URL: {
		dev: process.env.SERVER_URL_DEV,
		prod: process.env.SERVER_URL_PROD,
	},
	EMAIL_MODE: process.env.EMAIL_MODE,
	MACHINE: process.env.MACHINE,
	DB_URL: process.env.DB_URL,
    
	REDIS_CONFIG: {
		dev: {
			HOST: process.env.REDIS_DEV_HOST,
			PORT: process.env.REDIS_DEV_PORT,
			PASSWORD: process.env.REDIS_DEV_PASSWORD,
		},
		prod: {
			HOST: process.env.REDIS_PROD_HOST,
			PORT: process.env.REDIS_PROD_PORT,
			PASSWORD: process.env.REDIS_PROD_PASSWORD,
		},
	},
	X_API_KEY: process.env.X_API_KEY,
	X_TEST_KEY: process.env.X_TEST_KEY,
	SIB_APIKEY: process.env.SIB_APIKEY,
	ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,

	PASSWORD_SALT: process.env.PASSWORD_SALT,

	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,

	ADMIN_ACCESS_TOKEN_SECRET: process.env.ADMIN_ACCESS_TOKEN_SECRET,
	ADMIN_REFRESH_TOKEN_SECRET: process.env.ADMIN_REFRESH_TOKEN_SECRET,
	ADMIN_ACCESS_TOKEN_EXPIRY: process.env.ADMIN_ACCESS_TOKEN_EXPIRY,
	ADMIN_REFRESH_TOKEN_EXPIRY: process.env.ADMIN_REFRESH_TOKEN_EXPIRY,
};

export default env;
