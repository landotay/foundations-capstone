console.log('JavaScript Linked')

const randomMovieButton = document.getElementById('randomMovieButton')

const randomMovie = () => {
    axios.get('/api/randomMovie')
        .then(res => {

            removeAllChildNodes(randomMovieContainer)

            const randomMovieCard = document.createElement('div')
            randomMovieCard.classList.add('randomMovieCard')
    
            randomMovieCard.innerHTML = `
            <p id="randomMovieName">Tonights Movie: ${res.data}</p>
            `
            randomMovieContainer.appendChild(randomMovieCard)
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
randomMovieButton.addEventListener("click", randomMovie)