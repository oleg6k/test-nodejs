const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const {secret, tokens} = require('../config/serverConfig').jwt;

const TokenService = require('../services/TokenService');

const generateAccessToken = (userId) => {
  const payload = {
    id: uuid(),
    user_id: userId,
    type: tokens.access.type
  };
  const options = {};
  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options)
  }
};


const updateTokens = (userId, fullUpdate = false) => {
  if (fullUpdate) {
    const accessToken = generateAccessToken(userId);
    return replaceDbAccessToken(accessToken.id, userId)
      .then(() => ({
        token: accessToken.token
      }))
  } else {
    return refreshDbAccessToken(userId)
  }
};

const replaceDbAccessToken = (tokenId, userId) => TokenService.replaceAccessToken(tokenId, userId);

const refreshDbAccessToken = (userId) => TokenService.refreshAccessToken(userId);

module.exports = {
  updateTokens
};