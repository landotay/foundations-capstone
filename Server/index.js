const express = require('express')
const path = require('path')
const cors = require('cors')
const movies = require('./db.json')
const ctrl = require('./controller')

const app = express()

const port = process.env.PORT || 4001

app.use(express.json())
app.use(cors())


// ENDPOINTS

//home page
app.get('/public/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'))
})

app.use('/styles.css', express.static(path.join(__dirname, '../public/styles.css')))

//movie list
app.get('/public/movie-list/movieList.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/movie-list/movieList.html'))
})

app.use('/public/movie-list/styles.css', express.static(path.join(__dirname, '../public/movie-list/styles.css')))

app.use('/js', express.static(path.join(__dirname, '../public/movie-list/main.js')))

app.get('/api/movies', ctrl.getAllMovies)

app.put('/api/movies/:id', ctrl.updateMovie)

//movie picker
app.get('/public/movie-picker/moviepicker.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/movie-picker/moviePicker.html'))
})
app.use('/moviep.js', express.static(path.join(__dirname, '../public/movie-picker/main.js')))

app.get('/api/randomMovie', ctrl.movieTitle)

app.use('/public/movie-picker/styles.css', express.static(path.join(__dirname, '../public/movie-picker/styles.css')))

//login page
app.get('/public/login/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/login.html'))
})

app.use('/public/login/styles.css', express.static(path.join(__dirname, '../public/login/styles.css')))





app.listen(port, () => console.log(`Port ${port} is running.`))