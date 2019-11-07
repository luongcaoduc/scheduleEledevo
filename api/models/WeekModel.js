const mongoose = require('mongoose')

const weekSchema = new mongoose.Schema({
  week: Number,
  start_date : Date,
  end_date: Date
})

module.exports = mongoose.model('Weeks', weekSchema);