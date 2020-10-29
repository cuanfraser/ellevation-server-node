const mongoose = require('mongoose')
const managerSchema = require('./manager.schema')

const managerModel = mongoose.model(
    'ManagerModel',
    managerSchema
)

module.exports = managerModel