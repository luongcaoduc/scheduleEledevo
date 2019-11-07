var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  empid: {
    type: Number,
    required: true,
    unique: true
  },
  birthday: {
    type: Date,
    required: true,
    default: new Date("1998-11-11")
  },
  sex: {
    type: String,
    required: true,
    default: 'Male'
  },
  email: {
    type: String,
    required: true,
    default: 'thang@gmail.com'
  },
  phone_number: {
    type: String,
    required: true,
    default: '0984743917'
  },
  address: {
    type: String,
    required: true,
    default: 'Luong Son - Hoa Binh'
  }
})

module.exports = mongoose.model('Employees', employeeSchema);