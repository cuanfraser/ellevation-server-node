const employeeDaos = require('../daos/employee.dao')

const findAllEmployees = () => employeeDaos.findAllEmployees()
const findEmployeeById = (id) => employeeDaos.findEmployeeById(id)
const findEmployeesForManager = (mid) => employeeDaos.findEmployeesForManager(mid)
const findEmployeesNotHR = () => employeeDaos.findEmployeesNotHR()
const createEmployee = (employee) => employeeDaos.createEmployee(employee)
const updateEmployee = (id, employee) => employeeDaos.updateEmployee(id, employee)
const findEmployeeByCredentials = (username, password) => employeeDaos.findEmployeeByCredentials(username, password)
const isEmployeeIdHr = (id) => findEmployeeById(id).hr
const isEmployeeIdManagedByMid = (eid, mid) => findEmployeesForManager(mid).some(employee => employee.id === eid)


module.exports = { findAllEmployees, findEmployeeById, findEmployeesForManager, 
    findEmployeesNotHR, createEmployee, updateEmployee, findEmployeeByCredentials, isEmployeeIdHr, isEmployeeIdManagedByMid  }