const { isEmployeeHR, isEmployeeIdManagedByMid } = require('../services/employee.service')
const employeeService = require('../services/employee.service')
const managerService = require('../services/manager.service')

module.exports = function (app) {
    // get all employees possible
    app.get('/api/employee', (req, res) => {
        if (req.session['profile']) {
            // admin
            if (req.session['userType'] === "admin") {
                employeeService.findAllEmployees()
                    .then(allEmployees => res.json(allEmployees))
            }
            // hr (only non hr employees)
            if (req.session['userType'] === "employee" && req.session['profile'].hr) {
                employeeService.findEmployeesNotHR()
                    .then(allEmployees => res.json(allEmployees))
            }
            // manager (find their employees)
            if (req.session['userType'] === "manager") {
                managerService.findEmployeesForManager(req.session['profile'].id)
                    .then(allEmployees => res.json(allEmployees))
            }
            else {
                res.status(403).send({
                    message: "You do not have permission to other employees' information"
                })
            }
            
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
        }})

    // get information for employee specified by id
    app.get('/api/employee/:id', (req, res) => {
        if (req.session['profile']) {
            // admin
            if (req.session['userType'] === "admin") {
                employeeService.findEmployeeById(req.params['id'])
                    .then(employee => res.json(employee))
            }
            // hr (only non hr employees)
            if (req.session['userType'] === "employee" && req.session['profile'].hr) {
                if (isEmployeeHR(req.params['id'])) {
                    employeeService.findEmployeeById(req.params['id'])
                        .then(employee => res.json(employee))
                }
            }
            // manager (if their employee)
            if (req.session['userType'] === "manager") {
                if (isEmployeeIdManagedByMid(req.params['id'], req.session['profile'].id))
                    employeeService.findEmployeeById(req.params['id'])
                        .then(employee => res.json(employee))
            }
            // own id
            if (req.session['profile'].id === req.params['id']) {
                employeeService.findEmployeeById(req.params['id'])
                        .then(employee => res.json(employee))
            }
            else {
                res.status(403).send({
                    message: "You do not have permission to this employee's information"
                })
            }
            
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
        }
    })

    // create employee (register below does similair)
    // app.post('/api/employee', (req, res) =>
    //     employeeService.createEmployee(req.body)
    //         .then(newEmployee => res.send(newEmployee)))


    // update employee specified by id
    app.put('/api/employee/:id', (req, res) => {
        if (req.session['profile']) {
            // admin
            if (req.session['userType'] === "admin") {
                employeeService.updateEmployee(req.params['id'], req.body)
                    .then(employee => res.json(employee))
            }
            // manager
            if (req.session['userType'] === "manager") {
                if (isEmployeeIdManagedByMid(req.params['id'], req.session['profile'].id)) {
                    employeeService.updateEmployee(req.params['id'], req.body)
                        .then(employee => res.json(employee))
                }
            }
            // hr
            if (req.session['userType'] === "employee" && req.session['profile'].hr) {
                if (!isEmployeeHR(req.params['id']))
                    employeeService.updateEmployee(req.params['id'], req.body)
                        .then(employee => res.json(employee))
            }
            // update own profile
            if (req.session['userType'] === "employee" && 
                (req.session['profile'].id === req.params['id'])) {

                employeeService.updateEmployee(req.params['id'], req.body)
                    .then(employee => res.json(employee))
            }
            else {
                res.status(403).send({
                    message: "You do not have permission to this employee's information"
                })
            }
            
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
        }
    })
        
    // register as employee
    app.post('/api/employee/register', (req, res) =>
        employeeService.createEmployee(req.body)
            .then(employee => {
                req.session['profile'] = employee
                req.session['userType'] = "employee"
                employee.password = '****'
                res.send(employee)
            }))

    // login as employee
    app.post('/api/employee/login', (req, res) => {
        employeeService.findEmployeeByCredentials(req.body.username, req.body.password)
            .then(employee => {
                if (employee) {
                    req.session['profile'] = employee
                    req.session['userType'] = "employee"
                    employee.password = '****'
                    res.send(employee)
                } else {
                    res.status(403).send({
                        message: `Employee ${req.body.username} not found`
                    })
                }
            })
    })

    // logout
    app.post('/api/employee/logout', (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    })

    // retrieve logged in profile
    app.post('/api/employee/profile', (req, res) => {
        if (req.session['profile']) {
            res.send(req.session['profile'])
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
        }
    })
}