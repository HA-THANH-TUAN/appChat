const client = require('../models/redis.model');
const { TIME_EXPIRED_REFRESHTOKEN } = require('../utils/auth/auth.utils');

const addTokenRedis = async (name, { refreshToken, publicKey }) => {
  const fieldsAdded = await client.hSet(name, {
    refreshToken,
    publicKey,
  });
  await client.expire(name, TIME_EXPIRED_REFRESHTOKEN);
  return fieldsAdded;
};

module.exports = { addTokenRedis };
