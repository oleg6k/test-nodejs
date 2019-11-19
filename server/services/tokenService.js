const db = require('../entities/models');
const config = require('../config/serverConfig');

class TokenService {
  static replaceAccessToken(tokenId, userId) {
    try {
      db.sequelize.getQueryInterface()
        .bulkDelete('tokens', {user_id: String(userId)}, {});

      const nextExpires = this.getNextExpires();

      return db.Token.create({
        token_id: tokenId,
        user_id: userId,
        expires: nextExpires
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static refreshAccessToken(userId) {
    const nextExpires = this.getNextExpires();

    return db.Token.update({
        expires: nextExpires
      },
      {where: {user_id: userId}})
  }

  static getByTokenId(tokenID) {
    return db.Token.findOne({
      where: {token_id: tokenID}
    })
  }

  static getNextExpires() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + config.jwt.tokens.access.refreshTimeMinutes);
    return new Date(now);
  }
}

module.exports = TokenService;