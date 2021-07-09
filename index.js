const port = 3002

const app = require('express')()
const consign = require('consign')

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./config/mongodb.js')
    .then('./api')    
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`)
})
