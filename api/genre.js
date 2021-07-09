
module.exports = app => {

    const GenreSchema = app.mongoose.Schema({
        name: String
    })    

    const GenreMDB = app.mongoose.model('genre', GenreSchema)

    const save = async (req, res) => {
        const genre = { ...req.body }

        if (req.params.id) genre.id = req.params.id               

        const newGenre= new GenreMDB({
            name: genre.name,
        });

        if (genre.id) {
            let query = { _id: genre.id }

            GenreMDB.findOneAndUpdate(query, { name: newGenre.name }).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            newGenre.save().then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }
    
    const get = (req, res) => {
        GenreMDB.find({}).sort({name: 'asc'}).then(genres => res.json(genres)).catch(err => res.status(500).send(err))
    }    

    const getById = (req, res) => {
        GenreMDB.findOne({ _id: req.params.id }).then(genre => res.json(genre)).catch(err => res.status(500).send(err))
    }    

    const getPerName = (req, res) => {
        if (req.params.name == 'null') {
            GenreMDB.find({}).sort({name: 'asc'}).then(genres => res.json(genres)).catch(err => res.status(500).send(err))
        } else {
            GenreMDB.find({ name: {  $regex: `.*${req.params.name}.*` }}).then(genres => {
                if (genres.length == 0) {
                    res.status(400).send('Nenhum gênero encontrado')
                } else {
                    res.json(genres)
                }
            })
        }   
    }    

    return { save, get, getById, getPerName }
}