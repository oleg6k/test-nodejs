const response = (res, data, code = 200, status = 'OK') => {
  res.status(code).json({message: status, data: data})
};

const responseError = (res, errorMessage, code = 400, status = 'ERROR') => {
  res.status(code).json({message: status, data: errorMessage})
};

module.exports = {
  response,
  responseError
};