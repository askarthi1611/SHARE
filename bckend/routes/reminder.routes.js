const router = require('express').Router()

const controller = require('../controllers/reminder.controller')

router.post('/',controller.createReminder)

router.get('/',controller.getReminders)

router.delete('/:id',controller.deleteReminder)

module.exports = router