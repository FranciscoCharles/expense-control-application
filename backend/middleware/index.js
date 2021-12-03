const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../models');
const dayjs = require('dayjs');

async function authorization(req, res, next) {
  let message = 'usuario não autorizado';
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No credentials sent!' });
    }
    console.log(req.headers.authorization);
    const data = req.headers.authorization;
    const bearer = data.split(' ')[1];
    if (bearer) {
      jwt.verify(bearer, process.env.TOKEN_SECRET);
      res.header('Authorization', 'Bearer '+ bearer);
      return next()
    }
  } catch (error) {
      message = error.message;
  }
  res.status(500).json({ message });
}
async function authenticate(username, password) {
  const user = await db.User.findOne({ where: { email: username } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw Error('Username or password is incorrect');
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(user);
  const refreshToken = await generateRefreshToken(user);
  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: refreshToken.token
  };
}

async function refreshToken(token) {
  const refreshToken = await getRefreshToken(token);
  const { user } = refreshToken;
  // generate new jwt
  const jwtToken = generateJwtToken(user);
  refreshToken.expires = dayjs().add(5, 'm').valueOf().toString()
  await refreshToken.save();
  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: refreshToken.token
  };
}
// helper functions

async function getUser(id) {
  //if (!db.isValidId(id)) throw 'User not found';
  const user = await db.User.findByPk(id);
  if (!user) throw Error('User not found');
  return user;
}

async function getRefreshToken(token) {
  const refreshTokenResult = await db.RefreshToken.findOne({
    where:{
      token
    }
  });
  if (!refreshTokenResult || refreshTokenResult.isExpired) throw Error('Invalid Refresh token');
  return refreshTokenResult;
}

function generateJwtToken(user) {
  // create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign({ id: user.id, name: user.first_name }, process.env.TOKEN_SECRET, { expiresIn: '5min' });
}

async function generateRefreshToken(user) {
  // create a refresh token that expires in 7 days
  //console.log('\x1b[31m', db.RefreshToken.create,'\x1b[0m')
  return await db.RefreshToken.create({
    user: user.id,
    token: randomTokenString(),
    expires: dayjs().add(15, 'm').valueOf().toString(),
  });
}

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
  const { id, first_name, email } = user;
  return { id, first_name, email };
}

module.exports = {
  basicDetails,
  authenticate,
  refreshToken,
  getUser,
  getRefreshToken,
  authorization
}