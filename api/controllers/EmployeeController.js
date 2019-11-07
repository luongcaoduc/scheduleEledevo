'use strict';
const mongoose = require('mongoose')
const Employee = require('../models/EmployeeModel')
const Calendar = require('../models/CalendarModel')
const Week = require('../models/WeekModel')

exports.list_all_employees = function (req, res) {
  Employee.find({}, function (err, employee) {
    if (err)
      res.send(err)
    res.json(employee)
  });
}

exports.read_a_employee = async function (req, res) {
  await Calendar.find({employee: req.params.employeeId}).populate('week', 'week start-date end-date').exec( function (err, calendars) {
    res.json({calendars: calendars})
  })
}

exports.create_a_employee = async function (req, res) {
  var new_employee = new Employee(req.body)

  await new_employee.save(function (err) {
    if (err) throw err
  })

  await Week.findOne({}).sort({week: 'desc'}).exec(function (err, lastweek) {
    if (err) throw err
    var calendar = new Calendar({
      employee: new_employee._id,
      week: lastweek._id
    })
    calendar.save()
  })

  res.json({ok: "Sucess"})
}