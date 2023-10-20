const jwt = require('jsonwebtoken');
const client = require('../models/redis.model');
const { BadResponse, Unauthorized } = require('../core/error.response');
const { verifyTokenAccessToken } = require('../utils/auth/auth.utils');

const algorithmAccessToken = process.env.DEV_ALIGORITHM_ACCESSTOKEN;

const verifyUser = async (req, res, next) => {
  // middleWareCheck User
  console.log('middleWareCheck User');
  const accessToken = req.headers['authorization'].slice(7);
  const resultDecodePayload = jwt.decode(accessToken, { complete: true })?.payload; // decode get id and deviceId
  if (resultDecodePayload) {
    const { id, deviceId } = resultDecodePayload;
    const publicKeyFromRedis = await client.hGet(`tokens:${id}:${deviceId}`, 'publicKey');
    // get publicKey verify account

    if (publicKeyFromRedis === null) {
      // When token deleted in Redis
      throw new Unauthorized('login again');
    }

    const resultverifyTokenAccessToken = verifyTokenAccessToken(accessToken, publicKeyFromRedis, {
      algorithm: [algorithmAccessToken],
    });
    if (resultverifyTokenAccessToken === true) {
      req.userId = id;
      next();
      return null;
    } else if (resultverifyTokenAccessToken == null) {
      // Case expire token
      throw new Unauthorized('expired');
    } else if (resultverifyTokenAccessToken == false) {
      throw new Unauthorized();
    }
  }
  throw new Unauthorized('login again');
};

module.exports = verifyUser;
