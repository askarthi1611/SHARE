const Event = require('../models/event.model')

exports.createEvent = async (req, res) => {
  try {

    const event = await Event.create(req.body)

    res.status(201).json(event)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }
}

exports.getEvents = async (req, res) => {
  try {

    const events = await Event.find()

    res.json(events)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }
}

exports.deleteEvent = async (req, res) => {
  try {

    await Event.findByIdAndDelete(req.params.id)

    res.json({
      message: "Event removed"
    })

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }
}