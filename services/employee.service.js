const employeeDaos = require('../daos/employee.dao')

const findAllEmployees = () => employeeDaos.findAllEmployees()
const findEmployeeById = (id) => employeeDaos.findEmployeeById(id)
const findEmployeesForManager = (mid) => employeeDaos.findEmployeesForManager(mid)
const findEmployeesNotHR = () => employeeDaos.findEmployeesNotHR()
const createEmployee = (employee) => employeeDaos.createEmployee(employee)
const updateEmployee = (id, employee) => employeeDaos.updateEmployee(id, employee)
const deleteEmployee = (id) => employeeDaos.deleteEmployee(id)
const findEmployeeByCredentials = (username, password) => employeeDaos.findEmployeeByCredentials(username, password)

const isEmployeeIdHr = (id) => findEmployeeById(id).hr
const isEmployeeIdManagedByMid = (eid, mid) => findEmployeesForManager(mid).some(employee => employee.id === eid)

// for theoretical moving code away from controller to service files
const findPermittedEmployees = (userType, profile) => {
    if (profile) {
        // admin
        if (userType === "admin") {
            return findAllEmployees()
        }
        // hr (only non hr employees)
        if (userType === "employee" && profile.hr) {
            return findEmployeesNotHR()
        }
        // manager (find their employees)
        if (userType === "manager") {
            return findEmployeesForManager(profile.id)
        }
        else {
            return -1
        }
        
    }
}


module.exports = { findAllEmployees, findEmployeeById, findEmployeesForManager, 
    findEmployeesNotHR, createEmployee, updateEmployee, findEmployeeByCredentials, 
    isEmployeeIdHr, isEmployeeIdManagedByMid, findPermittedEmployees, deleteEmployee  }