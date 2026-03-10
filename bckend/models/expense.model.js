const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({

title:String,
description:String,
amount:String,
currency:String,
category:String,
paymentMethod:String,
location:String,
date:String,
status:String,
userId:String

},{timestamps:true})

module.exports = mongoose.model('Expense',ExpenseSchema)