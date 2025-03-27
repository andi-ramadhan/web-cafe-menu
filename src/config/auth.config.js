const config = require('../utils/config');

module.exports = {
  secret: config.jwt.secret,
  tokenExpiration: '1m'
}