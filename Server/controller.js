let movies = require('./db.json')
   
module.exports = {
    getAllMovies: (req, res) => {
        console.log(movies)
     res.status(200).send(movies)
    }
}