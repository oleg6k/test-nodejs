const tcpp = require('tcp-ping');
const resHelper = require('../helpers/responseHelper');

const info = (req, res) => {
  return resHelper.response(res, {id: req.user.id})
};

const googleLatency = (req, res) => {
  tcpp.ping({address: 'google.com'}, function (err, data) {
    if (err) return resHelper.responseError(res, 'Ooops!');
    return resHelper.response(res, {latency: data.avg})
  });
};

module.exports = {
  info,
  googleLatency
};