const mongoose = require('mongoose')

const checkEmail = (email) => {
    var chars = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return chars.test(email)
};

const managerSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String,
    salary: Number,
    salaryHistory: [Number],
    vac: Number,
    bonus: Number,
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeModel'
    }],
    email: { type: String, lowercase: true, validate: [checkEmail, 'Email invalid'] }
}, { collection: 'manager' })
module.exports = mangerSchema