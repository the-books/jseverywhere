const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = async user => {
  return await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

const validateJWT = async token => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};


const user = {
  _id: 'a111777',
  name: 'TOM',
};
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExMTE3NzciLCJpYXQiOjE2MjQ0MjI0MzN9.SZkaf7Z0xbKiSctopYLoP2DbH9dHW6KbFXTwTiHQeDU';

/**
  Header
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  Payload
  {
    "id": "a111777",
    "iat": 1624422433
  }
  Signature
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    JAVASCRIPTEVERYWHERE
  )
 */

// generateJWT(user).then(
//   res => console.log(res),
//   err => console.error(err),
// );

validateJWT(token).then(
  res => console.log(res), // { id: 'a111777', iat: 1624422433 }
  err => console.error(err),
);
