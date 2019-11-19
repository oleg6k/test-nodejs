const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

const jwt = require('jsonwebtoken');
const {tokens, secret} = require('../config/serverConfig').jwt;

module.exports = async (req, res, next) => {

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({message: 'Incorrect token!'})
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, secret);
    if (payload.type !== tokens.access.type) {
      return res.status(401).json({message: 'Invalid token!'})
    }

    const dbToken = await tokenService.getByTokenId(payload.id);
    if (!dbToken) return res.status(401).json({message: 'Invalid token!'});
    if (new Date(dbToken.expires) < new Date()) throw new jwt.TokenExpiredError;

    const dbUser = await userService.getAUser(payload.user_id);
    if (!dbUser) return res.status(401).json({message: 'User not found!'});
    req.user = dbUser

  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({message: 'Token expired!'})
    }
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({message: 'Invalid token!'})
    }
  }

  next();
};
