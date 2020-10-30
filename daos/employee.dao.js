const employeeModel = require('../models/employee/employee.model')
const managerModel = require('../models/manager/manager.model')

const findAllEmployees = () => employeeModel.find()
const findEmployeeById = (eid) => employeeModel.findById(eid)
const findEmployeesForManager = (mid) => managerModel.findById(mid)
    .populate('employees').then(manager => manager.employees)
const findEmployeesNotHR = () => employeeModel.find({ hr: false })

const createEmployee = (employee) => employeeModel.create(employee)
const updateEmployee = (id, employee) => employeeModel.findOneAndUpdate({ _id: id }, employee)
const deleteEmployee = (id) => employeeModel.deleteOne({_id: id})

const findEmployeeByCredentials = (username, password) =>
    employeeModel.findOne(
        {
            username: username,
            password: password
        })

module.exports = { findAllEmployees, findEmployeeById, findEmployeesForManager, createEmployee, 
    updateEmployee, findEmployeeByCredentials, findEmployeesNotHR, deleteEmployee }