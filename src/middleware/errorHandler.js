/*global ISPROD */

module.exports = (err, req, res, next) => {
  const resultData = {
    api: req.originalUrl,
    method: req.method,
    message: "ERROR",
    version: "0.0.1",
    production: ISPROD,
    code: -200,
    data: err && err.message ? err.message : err
  };

  res.status(err.status || 200).send(resultData);
};
