const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const url = 'mongodb://localhost/provi_db'

module.exports = app => {
    const con = new mongoose.Mongoose()
     
    con.connect(url, { useNewUrlParser: true, connectTimeoutMS: 10000, poolSize: 10, writeConcern: { j: true }, useUnifiedTopology: true })
    .catch(e => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })

    app.mongoose = con

    return { con }
}
