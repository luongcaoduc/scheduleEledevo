'use strict';

module.exports = function(APP){
  var employeeList = require('../controllers/EmployeeController');

  APP.route('/employee')
    .get(employeeList.list_all_employees)
    .post(employeeList.create_a_employee)

  APP.route('/employee/:employeeId')
    .get(employeeList.read_a_employee)

}