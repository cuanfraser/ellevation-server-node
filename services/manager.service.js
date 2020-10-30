const managerDaos = require('../daos/manager.dao')
const employeeDaos = require('../daos/employee.dao')

const findAllManagers = () => managerDaos.findAllManagers()
const findManagerById = (id) => managerDaos.findManagerById(id)
const createManager = (manager) => managerDaos.createManager(manager)
const updateManager = (id, manager) => managerDaos.updateManager(id, manager)

const findEmployeesForManager = (mid) => employeeDaos.findEmployeesForManager(mid)

const findManagerByCredentials = (username, password) => managerDaos.findManagerByCredentials(username, password)

module.exports = { findAllManagers, findManagerById, createManager, updateManager, findEmployeesForManager, findManagerByCredentials }