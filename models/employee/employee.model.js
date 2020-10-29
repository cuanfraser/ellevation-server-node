const mongoose = require('mongoose')
const employeeSchema = require('./employee.schema')

const employeeModel = mongoose.model(
    'EmployeeModel',
    employeeSchema
)

module.exports = employeeModel