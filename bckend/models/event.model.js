const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

description:{
type:String
},

location:{
type:String
},

date:{
type:String,
required:true
},

startTime:{
type:String
},

endTime:{
type:String
},

timezone:{
type:String,
default:"Asia/Kolkata"
},

eventType:{
type:String,
enum:["personal","work","meeting","task"],
default:"personal"
},

color:{
type:String,
default:"#2196F3"
},

isAllDay:{
type:Boolean,
default:false
},

isRecurring:{
type:Boolean,
default:false
},

recurringType:{
type:String,
enum:["daily","weekly","monthly","yearly"]
},

reminderBefore:{
type:Number,   // minutes
default:30
},

status:{
type:String,
enum:["scheduled","cancelled","completed"],
default:"scheduled"
},

userId:{
type:String,
required:true
}

},{timestamps:true})

module.exports = mongoose.model("Event",EventSchema)