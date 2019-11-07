var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({
  monday: {
    type: String,
    default: ''
  },
  tuesday: {
    type: String,
    default: ''
  },
  wednesday: {
    type: String,
    default: ''
  },
  thursday: {
    type: String,
    default: ''
  },
  friday: {
    type: String,
    default: ''
  },
  saturday: {
    type: String,
    default: ''
  },
  sunday: {
    type: String,
    default: ''
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees'
  },
  week: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weeks'
  }
});

module.exports = mongoose.model('Calendars', calendarSchema);
