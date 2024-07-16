const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const streamSecret = 'z6y5exr3jfg7wryvp22ju4vm6u7cmrdqhxptkfmzhsasb2hag544mcuvrfcym7yq';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, _id }) {
    const payload = { username, _id };



    return {
      system: jwt.sign({ data: payload }, secret, { expiresIn: expiration }), 
      stream: jwt.sign({user_id: _id}, streamSecret, { noTimestamp: true })};
  },
};