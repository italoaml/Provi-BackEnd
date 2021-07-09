const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)     
    }
    
    const UserSchema = app.mongoose.Schema({
        name: String,
        password: String
    })    

    const UserMDB = app.mongoose.model('users', UserSchema)

    const save = async (req, res) => {
        const user = { ...req.body }

        if (req.params.id) user.id = req.params.id

        // if (!req.originalUrl.startsWith('/users')) user.admin = false
        // if (!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')            

            const usermdb = await UserMDB.findOne({ name: user.name }).exec();

            if (usermdb && !user.id) {
                notExistsOrError(usermdb['_id'], 'Usuário já cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        const newUser = new UserMDB({
            name: user.name,
            password: user.password
        });            

        if (user.id) {
            let query = { _id: user.id }

            UserMDB.findOneAndUpdate(query, { 
                                            name: newUser.name, 
                                            password: newUser.password
                                            })
                .then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            newUser.save().then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }    

    const get = (req, res) => {        
        UserMDB.find({ deletedAt: null }).sort({name: 'desc'}).then(users => res.json(users)).catch(err => res.status(500).send(err))
    }    

    return { save, get, UserMDB }
}