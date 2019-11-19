const authHelper = require('../helpers/authHelper');

module.exports = async (req, res, next) => {

  authHelper.updateTokens(req.user.id)
    .catch(e => res.status(401).json({message: 'Invalid token!'}));

  next()
};
