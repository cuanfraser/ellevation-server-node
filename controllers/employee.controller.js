const employeeService = require('../services/employee.service')

module.exports = function (app) {
    app.get('/api/employee', (req, res) => {
        if (req.session['profile']) {
            employeeService.findAllEmployees()
                .then(allEmployees => res.json(allEmployees))
        }
        else {
            res.status(401).send({
                message: 'Please log in'
            })
        }})
    app.get('/api/employee/:id', (req, res) =>
        employeeService.findEmployeeById(req.params['id'])
            .then(employee => res.json(employee)))
    app.post('/api/employee', (req, res) =>
        employeeService.createEmployee(req.body)
            .then(newEmployee => res.send(newEmployee)))
    app.put('/api/employee/:id', (req, res) =>
        employeeService.updateEmployee(req.params['id'], req.body)
            .then(employee => res.json(employee)))

    app.post('/api/employee/register', (req, res) =>
        employeeService.createEmployee(req.body)
            .then(employee => {
                req.session['profile'] = employee
                employee.password = '****'
                res.send(employee)
            }))

    app.post('/api/employee/login', (req, res) => {
        employeeService.findEmployeeByCredentials(req.body.username, req.body.password)
            .then(employee => {
                if (employee) {
                    req.session['profile'] = employee
                    employee.password = '****'
                    res.send(employee)
                } else {
                    res.status(403).send({
                        message: `Employee ${req.body.username} not found`
                    })
                }
            })
    })

    app.post('/api/employee/logout', (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    })

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