const moviesContainer = document.getElementById('movies-container')



const moviesCallback = (data) => displayMovies(data)
const errCallback = err => console.log(err.response.data)

console.log('JavaScript linked successfully')

const getAllMovies = () => axios.get('/api/movies').then(res => moviesCallback(res.data)).catch(errCallback)

const updateMovie = (id, type) => axios.put(`/api/movies/${id}`, {type}).then(() => {
    moviesCallback
    location.reload()
}).catch(errCallback)


function createMovieCard(movie) {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')

    movieCard.innerHTML = `<img alt='movie cover' src=${movie.imageURL} class="movie-cover"/>
    <p class="movie-title">${movie.title}</p>
    <div class="btns-container">
        <button onclick="updateMovie(${movie.id}, 'minus')">-</button>
        <p class="movie-rating">${movie.rating} stars</p>
        <button onclick="updateMovie(${movie.id}, 'plus')">+</button>
    </div>
    `


    moviesContainer.appendChild(movieCard)
}

function displayMovies(arr) {
    console.log(arr)
    moviesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMovieCard(arr[i])
    }
}

setTimeout(getAllMovies(), 1000)

const btnWatch = document.querySelector('.watch')

btnWatch.addEventListener('click', () => {
    btnWatch.innerText = "Watched"
})