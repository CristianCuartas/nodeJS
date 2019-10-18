function RequestType(req, res, next) {
  console.log('Request Type: ', req.method);
  next();
}
module.exports = RequestType;
