const router = require('express').Router()

const controller = require('../controllers/event.controller')

router.post('/', controller.createEvent)

router.get('/', controller.getEvents)

router.delete('/:id', controller.deleteEvent)

module.exports = router