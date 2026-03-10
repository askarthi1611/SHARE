const Reminder = require('../models/reminder.model')

exports.createReminder = async (req,res) => {

  try{

    const reminder = await Reminder.create(req.body)

    res.status(201).json(reminder)

  }catch(err){

    res.status(500).json({
      error:err.message
    })

  }

}

exports.getReminders = async (req,res) => {

  try{

    const reminders = await Reminder.find().populate("eventId")

    res.json(reminders)

  }catch(err){

    res.status(500).json({
      error:err.message
    })

  }

}

exports.deleteReminder = async (req,res) => {

  try{

    await Reminder.findByIdAndDelete(req.params.id)

    res.json({
      message:"Reminder deleted"
    })

  }catch(err){

    res.status(500).json({
      error:err.message
    })

  }

}