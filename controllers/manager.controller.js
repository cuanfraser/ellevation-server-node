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
}