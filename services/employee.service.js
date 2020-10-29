const employeeDaos = require('../daos/employee.dao')

const findAllEmployees = () => employeeDaos.findAllEmployees()
const findEmployeeById = (id) => employeeDaos.findEmployeeById(id)
const createEmployee = (employee) => employeeDaos.createEmployee(employee)
const updateEmployee = (id, employee) => employeeDaos.updateEmployee(id, employee)
const findEmployeeByCredentials = (username, password) => employeeDaos.findEmployeeByCredentials(username, password)

module.exports = { findAllEmployees, findEmployeeById, createEmployee, updateEmployee, findEmployeeByCredentials }