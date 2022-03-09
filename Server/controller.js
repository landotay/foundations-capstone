const Sequelize = require('sequelize')
const path = require('path')
require('dotenv').config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
   
module.exports = {
    getAllMovies: (req, res) => {
        sequelize.query(`
        SELECT * FROM movies
        ORDER BY movie_id
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    updateMovie: async(req, res) => {
        let {id} = req.params
        let {type} = req.body
        // let index = movies.findIndex(elem => elem.id === +id)
        let [movie] = await sequelize.query(`
            SELECT * FROM movies
            WHERE movie_id = ${id}
            `)
            console.log(movie)
        if (movie[0].movie_rating === 5 && type === 'plus'){
            res.status(400).send('cannot go above 5')
        }else if (type === 'plus'){
            sequelize.query(`
            UPDATE movies
            SET movie_rating = movie_rating + 1
            WHERE movie_id = ${id}
            `).then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))

        }else if (type === 'minus'){
            sequelize.query(`
            UPDATE movies
            SET movie_rating = movie_rating - 1
            WHERE movie_id = ${id}
            `).then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))

        }else if (movie[0].movie_rating === 1 && type === 'minus'){
            res.status(400).send('Cannot go below 1')

        }else{
            res.status(400).send ('you broke something')
            
        }
    },
    movieTitle: (req, res)=>{
        const titles = ["Big Daddy",
            "Spy Kids 2: The Island of Lost Dreams",
            "The King of Staten Island",
            "Burt Wonderstone",
            "I Now Pronounce You Chuck & Larry",
            "The Big Lebowski",
            "Desperado",
            "Interview",
            "The Wedding Singer",
            "Airheads",
            "Living in Oblivion",
            "The Search for One Eye Jimmy"
       ]

       let randomIndex = Math.floor(Math.random() * titles.length);
       let randomMovieTitle = titles[randomIndex];
       
       res.send(randomMovieTitle);
             }
             
}

