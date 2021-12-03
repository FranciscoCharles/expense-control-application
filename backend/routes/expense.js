const express = require('express');
const { Expense, ExpenseList } = require('../models');
const constants = require('../utils/constants');
const {authorization} = require('../middleware');
const router = express.Router();

async function index(req, res) {
  try {
    const result = await ExpenseList.findAll();
    const expenses = result.map(data => ({
      ...data.dataValues,
      date: data.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1')
    }));
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

router.get('/',authorization, index);
router.get('/list',authorization, index);

router.get('/edit-expense-list/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const expenseList = await ExpenseList.findOne({ where: { id } });
    if (expenseList) {
      const expenseChilds = await Expense.findAll({ where: { id_expense_list: id } });
      return res.render('edit-expense-list', { title: process.env.TITLE, expenseList, expenseChilds });
    }
    res.status(constants.NOT_FOUND).json({ 'message-error': 'expense list not found!' });
  } catch (error) {
    res.status(constants.INTERNAL_SERVER_ERROR).json({ 'message-error': error.message })
  }
});
router.post('/edit-expense-list/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const expenseList = await ExpenseList.findOne({ where: { id } });
    if (expenseList) {
      expenseList.title = req.body.title;
      await expenseList.save();
      const expenseChilds = await Expense.findAll({ where: { id_expense_list: id } });
      return res.render('edit-expense-list', { title: process.env.TITLE, expenseList, expenseChilds });
    }
    res.status(constants.NOT_FOUND).json({ 'message-error': 'expense list not found!' });
  } catch (error) {
    res.status(constants.INTERNAL_SERVER_ERROR).json({ 'message-error': error.message })
  }
});
router.delete('/remove/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const expenseList = await ExpenseList.findOne({ where: { id } });
    if (expenseList) {
      await result.destroy()
      return res.status(constants.SUCESS).json({ sucess: true });
    }
    res.status(constants.NOT_FOUND).json({ 'message-error': 'expense list not found!' });
  } catch (error) {
    res.status(constants.INTERNAL_SERVER_ERROR).json({ 'message-error': error.message })
  }
});

module.exports = router;
