const mongoose = require('mongoose')
const adminSchema = require('./admin.schema')

const adminModel = mongoose.model(
    'AdminModel',
    adminSchema
)

module.exports = adminModel