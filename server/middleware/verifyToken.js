import jwt from 'jsonwebtoken';

exports.verify = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
    const secret = process.env.KEY;
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }
      req.user = data;

      next();
    });
  } else {
    return res.status(403).json({
      message: 'You need to sign up or login',
    });
  }
};
