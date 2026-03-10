const Expense = require('../models/expense.model')

exports.createExpense = async (req, res) => {
    try {

        const expense = await Expense.create(req.body)

        res.status(201).json(expense)

    } catch (err) {

        res.status(500).json({
            error: err.message
        })

    }
}

exports.getExpenses = async (req, res) => {
    try {

        const expenses = await Expense.find()

        res.json(expenses)

    } catch (err) {

        res.status(500).json({
            error: err.message
        })

    }
}

exports.deleteExpense = async (req, res) => {
    try {

        await Expense.findByIdAndDelete(req.params.id)

        res.json({
            message: "Expense deleted"
        })

    } catch (err) {

        res.status(500).json({
            error: err.message
        })

    }
}

exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(expense);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
