
module.exports = app => {

    const ActorSchema = app.mongoose.Schema({
        name: String
    })    

    const ActorMDB = app.mongoose.model('actor', ActorSchema)

    const save = async (req, res) => {
        const actor = { ...req.body }

        if (req.params.id) actor.id = req.params.id               

        const newActor= new ActorMDB({
            name: actor.name,
        });

        if (actor.id) {
            let query = { _id: actor.id }

            ActorMDB.findOneAndUpdate(query, { name: newActor.name }).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            newActor.save().then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }
    
    const get = (req, res) => {
        ActorMDB.find({}).sort({name: 'asc'}).then(actors => res.json(actors)).catch(err => res.status(500).send(err))
    }    

    const getById = (req, res) => {
        ActorMDB.findOne({ _id: req.params.id }).then(actor => res.json(actor)).catch(err => res.status(500).send(err))
    }    

    const getPerName = (req, res) => {
        if (req.params.name == 'null') {
            ActorMDB.find({}).sort({name: 'asc'}).then(actors => res.json(actors)).catch(err => res.status(500).send(err))
        } else {
            ActorMDB.find({ name: {  $regex: `.*${req.params.name}.*` }}).then(actors => {
                if (actors.length == 0) {
                    res.status(400).send('Nenhum Ator encontrado')
                } else {
                    res.json(actors)
                }
            })
        }   
    }    

    return { save, get, getById, getPerName }
}