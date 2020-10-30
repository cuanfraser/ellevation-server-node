const { isEmployeeHR, isEmployeeIdManagedByMid } = require('../services/employee.service')
const employeeService = require('../services/employee.service')

module.exports = function (app) {
    // get all employees possible
    app.get('/api/employee', async (req, res) => {

        if (req.session['profile']) {

            const userType = req.session['userType']
            const profile = req.session['profile']
    
            // admin
            if (userType === "admin") {
                await employeeService.findAllEmployees()
                    .then(allEmployees => res.json(allEmployees))
                return
            }
            // hr (only non hr employees)
            if (userType === "employee" && profile.hr) {
                await employeeService.findEmployeesNotHR()
                    .then(allEmployees => res.json(allEmployees))
                return
            }
            // manager (find their employees)
            if (userType === "manager") {
                await employeeService.findEmployeesForManager(profile._id)
                    .then(allEmployees => res.json(allEmployees))
                return
            }
            else {
                res.status(403).send({
                    message: "You do not have permission to other employees' information"
                })
                return
            }
            
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
            return
        }
    })

    // get information for employee specified by id
    app.get('/api/employee/:id', async (req, res) => {
        if (req.session['profile']) {

            const userType = req.session['userType']
            const profile = req.session['profile']

            // admin
            if (userType === "admin") {
                await employeeService.findEmployeeById(req.params['id'])
                    .then(employee => res.json(employee))
                return
            }
            // hr (only non hr employees)
            if (userType === "employee" && profile.hr) {
                if (isEmployeeHR(req.params['id'])) {
                    await employeeService.findEmployeeById(req.params['id'])
                        .then(employee => res.json(employee))
                    return
                }
            }
            // manager (if their employee)
            if (userType === "manager") {
                if (isEmployeeIdManagedByMid(req.params['id'], profile._id))
                    await employeeService.findEmployeeById(req.params['id'])
                        .then(employee => res.json(employee))
                    return
            }
            // own id
            if (profile._id === req.params['id']) {
                await employeeService.findEmployeeById(req.params['id'])
                        .then(employee => res.json(employee))
                return
            }
            else {
                res.status(403).send({
                    message: "You do not have permission to this employee's information"
                })
                return
            }
            
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
            return
        }
    })


    // update employee specified by id
    app.put('/api/employee/:id', async (req, res) => {
        if (req.session['profile']) {

            const userType = req.session['userType']
            const profile = req.session['profile']

            // admin
            if (userType === "admin") {
                await employeeService.updateEmployee(req.params['id'], req.body)
                    .then(employee => res.json(employee))
                return
            }
            // manager
            if (userType === "manager") {
                if (isEmployeeIdManagedByMid(req.params['id'], profile._id)) {
                    await employeeService.updateEmployee(req.params['id'], req.body)
                        .then(employee => res.json(employee))
                    return
                }
            }
            // hr
            if (userType === "employee" && profile.hr) {
                if (!isEmployeeHR(req.params['id']))
                    await employeeService.updateEmployee(req.params['id'], req.body)
                        .then(employee => res.json(employee))
                    return
            }
            // update own profile
            if (userType === "employee" && 
                (profile._id === req.params['id'])) {

                await employeeService.updateEmployee(req.params['id'], req.body)
                    .then(employee => res.json(employee))
                return
            }
            else {
                res.status(403).send({
                    message: "You do not have permission to this employee's information"
                })
                return
            }
            
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
            return
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