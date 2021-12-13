const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const url = require('url');
const db = require('../models');
const router = express.Router();
const { authenticate, refreshToken, authorization } = require('../middleware');
async function verifyRefreshToken(req, res) {
  try {
    const token = req.body?.refreshToken;
    if (token) {
      const newUserData = await refreshToken(token);
      return res.status(200).json(newUserData);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(500).json({ message: 'no refresh token' });
}
router.post('/token', async function (req, res) {
  try {
    const jwtToken = req.headers.authorization.split(' ')[1];
    if (jwtToken) {
      jwt.verify(jwtToken, process.env.TOKEN_SECRET);
      return res.status(200).json(req.body);
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log('jwt expirado');

      return await verifyRefreshToken(req, res);
    }
    return res.status(500).json({ message: error.message });
  }
  return res.status(500).json({ message: 'no token acess' });

});
router.post('/register', async function (req, res) {
  try {

    const { first_name, email, password } = req.body;

    if (!(email && password && first_name)) {
      return res.status(400).json({ message: 'All input is required' });
    }

    const oldUser = await db.User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).json({ message: 'User Already Exist. Please Login' });
    }
    let encryptedPassword = await bcrypt.hash(password, +process.env.TOKEN_SALT);
    const user = await db.User.create({
      first_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const data = await authenticate(email, password);
    res.status(201).json(data);
  } catch (e) {
    res.status(401).json(e);
  }
});


router.post('/login', async function (req, res) {

  console.log(req.body)
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({ message: 'All input is required' });
  }
  try {
    // Validate if user exist in our database
    data = await authenticate(email, password);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  //  res.setHeader('Authorization', 'Bearer '+ data.token); 
});

router.get('/logout', async function (req, res) {

  const user_data = req.session.user_data
  if (user_data) {
    const { id, refreshToken } = user_data;
    await db.RefreshToken.destroy({ where: { token: refreshToken } })
  }
  req.session.user_data = null;
  res.status(200).send('usuario deslogado com sucesso');
});

router.get('/private', authorization, function (req, res) {
  res.status(200).send('usuario logado, vc pode ver essa rota!');
});
router.get('/teste', async function (req, res) {
  const refreshToken = await dbRefreshToken.findOne({
    where: {
      id: 1
    }
  });
  res.send('batata');
});

module.exports = router;
