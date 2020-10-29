const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true }
}, { collection: 'admin' })

module.exports = adminSchema