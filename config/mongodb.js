const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// const url = 'mongodb://localhost/provi_db'
const url = 'mongodb+srv://provi:provi@cluster0.4vsnt.mongodb.net/provi-db?retryWrites=true&w=majority'
            //  mongodb+srv://realfisio:realfisioconnect@cluster0.vaavm.azure.mongodb.net/connect-realfisio?retryWrites=true&w=majority

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
