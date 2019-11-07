'use strict';

const mongoose = require('mongoose')
const Week = require('../models/WeekModel')
const Employee = require('../models/EmployeeModel')
const Calendar = require('../models/CalendarModel')

// Trả về tuần hiện tại
Date.prototype.getWeek = function () {
  var target  = new Date(this.valueOf());
  var dayNr   = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

exports.last_schedule = async function (req, res) {
  var page = parseInt(req.query._page) || 1
  var limit = parseInt(req.query._limit) || 5
  var totalPage
  Week.findOne({}).sort({week: 'desc'}).exec(function (err, lastweek) {
    if (err) throw err
    Calendar.find({week: lastweek._id}).count((err, items) => {
      if (err) throw err
      totalPage = Math.ceil(items / limit)
    })
    if (page < 1 || page > totalPage) {
      return res.json({message: "Invalid page number, should start with 1 and less total pages"})
    }
    Calendar.find({week: lastweek._id})
      .skip(limit * (page - 1))
      .limit(limit).populate('employee', 'name empid')
      .exec( function (err, calendars) {
      res.json({calendars: calendars, week: lastweek, totalPage: totalPage})
    })
  })
}

exports.last_schedule_search = async function (req, res) {
  var page = parseInt(req.query._page) || 1
  var limit = parseInt(req.query._limit) || 5
  var totalPage
  var textsearch = new RegExp(req.query.q, 'gi')
  console.log(req.query.q)
  Week.findOne({}).sort({week: 'desc'}).exec(function (err, lastweek) {
    if (err) throw err

    Calendar.find({week: lastweek._id})
      .populate({
        path: 'employee',
        match: { name: textsearch },
        select: 'name',
      })
      .exec( function (err, calendars) {
        calendars = calendars.filter((item) => (item.employee !== null))
        totalPage = Math.ceil(calendars.length / limit)
        if (page < 1 || page > totalPage) 
          return res.json({message: "Invalid page number, should start with 1 and less total pages"})

        calendars = calendars.slice((page - 1) * limit, (page - 1) * limit + limit)
        res.json({calendars: calendars, week: lastweek, totalPage: totalPage})
    })
  })
}

exports.last_schedule_put = function (req, res) {
  Calendar.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(err, calendar) {
    if (err) throw err
    res.json({ok: "Success!"})
  })
}

exports.new_schedule = async function (req, res) {
  var employees
  var week

  await Week.findOne({}).sort({week: 'desc'}).exec(function (err, lastweek) {
    if (lastweek) {
      var newweek = new Week({
        week: (lastweek.week + 1),
      })
      newweek.save()
      week = newweek
    } else {
      // Dùng cho lúc mới tạo csdl chưa có week nào
      var now = new Date()
      var newweek = new Week({
        week: now.getWeek(),
      })
      newweek.save()
      week = newweek
    }
  })

  await Employee.find({}, function (err, emps) {
    employees = emps
  })

  for (var i = 0; i < employees.length; i++) {
    var calendar = new Calendar({
      _id: new mongoose.Types.ObjectId(),
      employee: employees[i]._id,
      week: week._id,
    })
    await calendar.save()
  }

  res.json({ok: "Success!"})
}