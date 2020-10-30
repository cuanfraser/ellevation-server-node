const adminService = require('../services/admin.service')

module.exports = function (app) {
    app.get('/api/admin', (req, res) =>
        adminService.findAllAdmins()
            .then(allAdmins => res.json(allAdmins)))
    app.get('/api/admin/:aid', (req, res) =>
        adminService.findAdminById(req.params['aid'])
            .then(admin => res.json(admin)))
    app.post('/api/admin', (req, res) =>
        adminService.createAdmin(req.body)
            .then(newEmployee => res.send(newEmployee)))
    app.put('/api/admin/:aid', (req, res) =>
        adminService.updateAdmin(req.params['aid'], req.body)
            .then(admin => res.json(admin)))
    app.delete('/api/admin/:aid', (req, res) =>
        adminService.deleteAdmin(req.params['aid'])
            .then(resp => res.json(resp)))

    // login
    app.post('/api/admin/login', (req, res) => {
        adminService.findAdminByCredentials(req.body.username, req.body.password)
            .then(admin => {
                if (admin) {
                    req.session['profile'] = admin
                    req.session['userType'] = "admin"
                    admin.password = '****'
                    res.send(admin)
                } else {
                    res.status(403).send({
                        message: `Admin ${req.body.username} not found`
                    })
                }
            })
    })

    // logout
    app.post('/api/admin/logout', (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    })
    
}