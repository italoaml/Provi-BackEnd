
module.exports = app => {

    const DataSchema = app.mongoose.Schema({
        name: String,
        description: String,
        image: String,
        yearRelease: Number,
        type: String,
        actors: [],
        genre: {}
    })    

    const DataMDB = app.mongoose.model('data', DataSchema)

    const save = async (req, res) => {
        const data = { ...req.body }

        if (req.params.id) data.id = req.params.id               

        const newData= new DataMDB({
            name: data.name,
            description: data.description,
            image: data.image,
            yearRelease: data.yearRelease,
            type: data.type,
            actors: data.actors,
            genre: data.genre
        });

        if (data.id) {
            let query = { _id: data.id }

            DataMDB.findOneAndUpdate(query, { name: newData.name }).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            newData.save().then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }
    
    const get = (req, res) => {
        DataMDB.find({}).sort({name: 'asc'}).then(data => res.json(data)).catch(err => res.status(500).send(err))
    }    

    const getById = (req, res) => {
        DataMDB.findOne({ _id: req.params.id }).then(data => res.json(data)).catch(err => res.status(500).send(err))
    }    

    const getPerName = (req, res) => {
        if (req.params.name == 'null') {
            DataMDB.find({}).sort({name: 'asc'}).then(data => res.json(data)).catch(err => res.status(500).send(err))
        } else {
            DataMDB.find({ name: {  $regex: `.*${req.params.name}.*` }}).then(data => {
                if (data.length == 0) {
                    res.status(400).send('Nenhuma mídia encontrada')
                } else {
                    res.json(data)
                }
            })
        }   
    }    

    const getAll = (req, res) => {
        if (req.params.filter == '') {
            DataMDB.find({}).sort({name: 'asc'}).then(data => res.json(data)).catch(err => res.status(500).send(err))
        } else {
            DataMDB.find({ $or: [ { name: {  $regex: `.*${req.params.filter}.*` }}, 
                                  { 'genre.name': {  $regex: `.*${req.params.filter}.*` }}, 
                                  { 'actors.name': {  $regex: `.*${req.params.filter}.*` }} ]}).then(data => {
                if (data.length == 0) {
                    res.status(400).send('Nenhuma mídia encontrada')
                } else {
                    res.json(data)
                }
            })
        }   
    }     

    return { save, get, getById, getPerName, getAll }
}