const adminDaos = require('../daos/admin.dao')

const findAllAdmins = () => adminDaos.findAllAdmins()
const findAdminById = (id) => adminDaos.findAdminById(id)
const createAdmin = (admin) => adminDaos.createAdmin(admin)
const updateAdmin = (id, admin) => adminDaos.updateAdmin(id, admin)
const deleteAdmin = (id) => adminDaos.deleteAdmin(id)

const findAdminByCredentials = (username, password) => adminDaos.findAdminByCredentials(username, password)

module.exports = { findAllAdmins, findAdminById, createAdmin, updateAdmin, deleteAdmin, findAdminByCredentials }