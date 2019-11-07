'use strict';

module.exports = function (APP) {
	var ScheduleController = require('../controllers/ScheduleController')
	var EmployeeController = require('../controllers/EmployeeController')

	APP.route('/last-schedule')
		.get(ScheduleController.last_schedule)
		.put(ScheduleController.last_schedule_put)

	APP.route('/last-schedule/search')
		.get(ScheduleController.last_schedule_search)

	APP.route('/new-schedule')
		.get(ScheduleController.new_schedule)

	APP.route('/employee')
		.get(EmployeeController.list_all_employees)
		.post(EmployeeController.create_a_employee)

  APP.route('/employee/:employeeId')
    .get(EmployeeController.read_a_employee)

};
