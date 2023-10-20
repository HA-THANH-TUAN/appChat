const { createClient } = require('redis');
const configRedis = require('../configs/redis.config');
const client = createClient(configRedis);
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

module.exports = client;
