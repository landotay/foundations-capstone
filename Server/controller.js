let movies = require('./db.json')

module.exports = {
    getAllMovies: (req, res) => {
     res.status(200).send(movies)
    }
}