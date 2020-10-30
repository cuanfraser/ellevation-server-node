const managerService = require('../services/manager.service')

module.exports = function (app) {
    app.get('/api/manager', (req, res) =>
        managerService.findAllManagers()
            .then(allManagers => res.json(allManagers)))
    app.get('/api/manager/:mid', (req, res) =>
        managerService.findManagerById(req.params['mid'])
            .then(manager => res.json(manager)))
    app.get('/api/manager/:mid/employees'), (req, res) =>
        managerService.findEmployeesForManager(req.params['mid'])
            .then(employees => res.json(employees))
    app.post('/api/manager', (req, res) =>
        managerService.createManager(req.body)
            .then(newEmployee => res.send(newEmployee)))
    app.put('/api/manager/:mid', (req, res) =>
        managerService.updateManager(req.params['mid'], req.body)
            .then(manager => res.json(manager)))

    // login
    app.post('/api/manager/login', (req, res) => {
        managerService.findManagerByCredentials(req.body.username, req.body.password)
            .then(manager => {
                if (manager) {
                    req.session['profile'] = manager
                    req.session['userType'] = "manager"
                    manager.password = '****'
                    res.send(manager)
                } else {
                    res.status(403).send({
                        message: `Manager ${req.body.username} not found`
                    })
                }
            })
    })

    // logout
    app.post('/api/manager/logout', (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    })
}