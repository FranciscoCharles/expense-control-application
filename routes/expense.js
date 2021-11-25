const express = require('express');
const { Expense } = require('../models');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/listar', async function (req, res) {
  const result = await Expense.findAll();
  const expenses = result.map( data => data.dataValues);
  res.render('listar',{title:process.env.TITLE, expenses});
});

router.get('/create', async function (req, res) {
  const expense = await Expense.create({
    title: 'bananada',
    value: 30.0
  });
  res.send(expense);
});

module.exports = router;
