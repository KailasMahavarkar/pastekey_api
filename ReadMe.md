
# PasteKey - Secure and Private Paste API

PasteKey is a secure and private paste service that allows you to store and share text online. It is built using Node.js, Express.js, MongoDB, and Redis.


## License
Read The License [Here](https://github.com/KailasMahavarkar/pastekey_api/blob/main/LICENSE)

We are using the MIT license with Commons Clause Restriction, meaning you can use this project for free, but you can't sell it or use it commercially.

# Installation

## Prerequisites

- Node.js (v16+)
- MongoDB 
- Redis

## Setup

1. Clone the repository
    
    ```bash
    https://github.com/KailasMahavarkar/pastekey_api.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the environment variables

4. Start the server

    ```bash
    npm start
    ```


## Environment Variables

```txt
MODE=dev
EMAIL_MODE=dev
DB_MODE=dev
MACHINE=windows
DOMAIN=https://pastekey.netlify.app

SERVER_URL_DEV=http://localhost:3000
SERVER_URL_PROD=https://pastekey.netlify.app

DB_URL_PROD=mongodb+srv://your-db-username:your-db-password@your-cluster-url/pastekey?retryWrites=true&w=majority
DB_URL_DEV=mongodb+srv://your-db-username:your-db-password@your-cluster-url/pastekey_testing?retryWrites=true&w=majority

# redis dev
REDIS_DEV_HOST=your-redis-host
REDIS_DEV_PORT=your-redis-port
REDIS_DEV_PASSWORD=your-redis-password

# redis prod
REDIS_PROD_HOST=your-redis-host
REDIS_PROD_PORT=your-redis-port
REDIS_PROD_PASSWORD=your-redis-password

# API_KEY
ENCRYPTION_KEY=your-encryption-key
PASSWORD_SALT=your-password-salt
X_API_KEY=your-x-api-key
X_TEST_KEY=your-x-test-key

```