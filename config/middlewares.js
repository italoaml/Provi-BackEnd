const bodyParser = require('body-parser') 
const cors = require('cors') 

module.exports = app => {
    app.use(bodyParser.json({limit: '200mb'}))
    app.use(cors())
}