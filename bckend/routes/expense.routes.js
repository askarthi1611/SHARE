const router = require('express').Router()

const controller = require('../controllers/expense.controller')

router.post('/', controller.createExpense)

router.get('/', controller.getExpenses)

router.delete('/:id', controller.deleteExpense)

router.put('/:id', controller.updateExpense)

module.exports = router