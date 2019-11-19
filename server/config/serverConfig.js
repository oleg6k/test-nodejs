require('dotenv').config();

module.exports = {
  api: {
    url: process.env.APP_URL,
    port: process.env.APP_PORT,
  },
  jwt: {
    secret: 'secret',

    tokens: {
      access: {
        type: 'access',
        expiresIn: '10m',
        refreshTimeMinutes: 10,
      },
      refresh: {
        type: 'refresh',
        expiresIn: '20m'
      }
    }
  }
};