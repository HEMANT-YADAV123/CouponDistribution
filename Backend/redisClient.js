const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD, 
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('error', (err) => console.error(' Redis Error:', err));

redisClient.connect()
    .then(() => console.log('Redis connected successfully!'))
    .catch((err) => console.error('Redis connection failed:', err));

module.exports = { redisClient };
