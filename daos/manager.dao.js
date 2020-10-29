const managerModel = require('../models/manager/manager.model')

const findAllManagers= () => managerModel.find()
const findManagerById = (mid) => managerModel.findById(mid)
const createManager = (manager) => managerModel.create(manager)
const updateManager = (id, manager) => managerModel.findOneAndUpdate({ _id: id }, manager)

module.exports = { findAllManagers, findManagerById, createManager, updateManager }