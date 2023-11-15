let allMovies = [];

// Load CSV data from an external file
fetch('movies_metadata.csv')
    .then(response => response.text())
    .then(data => parseCSV(data))
    .catch(error => console.error('Error:', error));

function parseCSV(csvText) {
    Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            allMovies = results.data;
            displaySortedMovieTitles(allMovies);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function filterMovies() {
    const genreInput = document.getElementById('genre').value.toLowerCase();
    const ratingInput = document.getElementById('rating').value.toLowerCase();
    const platformInput = document.getElementById('platform').value.toLowerCase();

    const filteredMovies = allMovies.filter(movie =>
        (!genreInput || movie.genres.toLowerCase().includes(genreInput)) &&
        (!ratingInput || movie.vote_average.toString().toLowerCase().includes(ratingInput)) &&
        (!platformInput || movie.production_companies.toLowerCase().includes(platformInput))
    );

    displaySortedMovieTitles(filteredMovies);
}

function resetFilter() {
    displaySortedMovieTitles(allMovies);
}

function displaySortedMovieTitles(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';  // Clear previous results

    // Extract and sort movie titles alphabetically
    const sortedTitles = movies.map(movie => movie.title).sort();

    // Display sorted titles
    sortedTitles.forEach(title => {
        const titleItem = document.createElement('li');
        titleItem.textContent = title;
        movieList.appendChild(titleItem);
    });
}
