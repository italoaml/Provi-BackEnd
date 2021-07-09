module.exports = app => { 
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.api.user.get)    

    app.route('/genre')
    .all(app.config.passport.authenticate())
    .post(app.api.genre.save)
    .get(app.api.genre.get)       

    app.route('/genre/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.genre.getById)           

    app.route('/genre/perName/:name')
    .all(app.config.passport.authenticate())
    .get(app.api.genre.getPerName)       

    app.route('/actor')
    .all(app.config.passport.authenticate())
    .post(app.api.actors.save)
    .get(app.api.actors.get)       

    app.route('/actor/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.actors.getById)           

    app.route('/actor/perName/:name')
    .all(app.config.passport.authenticate())
    .get(app.api.actors.getPerName)       

    app.route('/data')
    .all(app.config.passport.authenticate())
    .post(app.api.data.save)
    .get(app.api.data.get)       

    app.route('/data/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.data.getById)           

    app.route('/data/perName/:name')
    .all(app.config.passport.authenticate())
    .get(app.api.data.getPerName)       

    app.route('/data/all/:filter')
    .all(app.config.passport.authenticate())
    .get(app.api.data.getAll)      
}