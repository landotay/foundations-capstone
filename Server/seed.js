const Sequelize = require('sequelize')
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
    seed: (req, res) => {
        sequelize.query(`
        CREATE TABLE movies(
        movie_id SERIAL PRIMARY KEY,
        movie_title VARCHAR(100),
        movie_rating INT,
        movie_img TEXT
        );

        INSERT INTO movies(movie_title, movie_rating, movie_img)
        VALUES
        ('Big Daddy', 5, 'https://m.media-amazon.com/images/M/MV5BYjAzNzQ4YzEtZWFlOS00YWVkLWE2NDctZDBiZTUxYjgwOTYzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg'),

        ('Spy Kids 2: The Island of Lost Dreams', 4, 'https://m.media-amazon.com/images/M/MV5BNWM2N2JjYzYtYWIyNS00NDc3LWFkNDctMmYwOWQyZTcxYjZhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'),

        ('The King of Staten Island', 3, 'https://m.media-amazon.com/images/I/71gFN6aNwVL._SL1500_.jpg'),

        ('Burt Wonderstone', 3 , 'https://m.media-amazon.com/images/M/MV5BMTk3MDkxMDAyN15BMl5BanBnXkFtZTcwODY5NzQyOQ@@._V1_.jpg'),

        ('I Now Pronounce You Chuck & Larry', 3, 'https://m.media-amazon.com/images/M/MV5BMTM4NDQ3NDQ3Nl5BMl5BanBnXkFtZTcwMjE4NjY0MQ@@._V1_QL75_UY281_CR1,0,190,281_.jpg'),

        ('The Big Lebowski', 5, 'https://m.media-amazon.com/images/M/MV5BNDQwMTAzOTkxNV5BMl5BanBnXkFtZTgwMjc0MTAwMjE@._V1_.jpg'),

        ('Desperado', 2, 'https://flxt.tmsimg.com/assets/p16804_p_v10_aa.jpg'),

        ('Interview', 3, 'https://m.media-amazon.com/images/M/MV5BMTIwNTA3MTgwNF5BMl5BanBnXkFtZTcwODYxNDk0MQ@@._V1_FMjpg_UX1000_.jpg'),

        ('The Wedding Singer', 2, 'https://m.media-amazon.com/images/M/MV5BYjM5YTQ0ZGYtMWExZi00MTFmLTg0YjUtZDcyMGNiYzE5MmNmL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'),

        ('Airheads', 1, 'https://m.media-amazon.com/images/M/MV5BMGIxNjVlMzUtMDE0ZC00OTRlLThkMGMtMWU2MWQ4ZTY1OGJmL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg'),

        ('Living in Oblivion', 3, 'https://m.media-amazon.com/images/M/MV5BMjMzNzc5MjI2Ml5BMl5BanBnXkFtZTgwMzU1MzgwMzE@._V1_.jpg'),

        ('The Search for One Eye Jimmy', 4, 'https://m.media-amazon.com/images/M/MV5BMjM4NTk0MDE4MF5BMl5BanBnXkFtZTgwNTQ5MjgwMzE@._V1_.jpg');
        `)
    }
}