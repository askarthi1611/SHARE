const mongoose = require('mongoose')

const ReminderSchema = new mongoose.Schema({

  eventId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Event",
    required:true
  },

  title:{
    type:String,
    required:true
  },

  message:{
    type:String
  },

  notifyAt:{
    type:Date,
    required:true
  },

  notificationType:{
    type:String,
    enum:["push","email","sms"],
    default:"push"
  },

  priority:{
    type:String,
    enum:["low","normal","high"],
    default:"normal"
  },

  status:{
    type:String,
    enum:["pending","sent","failed"],
    default:"pending"
  },

  sentAt:{
    type:Date
  },

  retryCount:{
    type:Number,
    default:0
  },

  userId:{
    type:String,
    required:true
  }

},{timestamps:true})

module.exports = mongoose.model("Reminder",ReminderSchema)