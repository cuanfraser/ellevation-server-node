const adminModel = require('../models/admin/admin.model')

const findAllAdmins= () => adminModel.find()
const findAdminById = (id) => adminModel.findById(id)
const createAdmin = (admin) => adminModel.create(admin)
const updateAdmin = (id, admin) => adminModel.findOneAndUpdate({ _id: id }, admin)
const deleteAdmin = (id) => adminModel.deleteOne({_id: id})

const findAdminByCredentials = (username, password) =>
    adminModel.findOne(
        {
            username: username,
            password: password
        })

module.exports = { findAllAdmins, findAdminById, createAdmin, updateAdmin, deleteAdmin, findAdminByCredentials }