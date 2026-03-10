const cron = require('node-cron')
const Reminder = require('../models/reminder.model')

cron.schedule('* * * * *', async ()=>{

const now = new Date()

const reminders = await Reminder.find({
notifyAt:{$lte:now},
status:"pending"
})

reminders.forEach(async(r)=>{

console.log("Reminder:",r.title)

r.status="sent"
r.sentAt=new Date()

await r.save()

})

})