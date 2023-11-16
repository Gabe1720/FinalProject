var allMovies = [];

        fetch("movies_metadata.csv")
            .then(response => response.text())
            .then(data => {
                // Parse CSV data
                const rows = data.split('\n');
                const headers = rows[0].split(',');
                // console.log(headers[22]);
                headers[22] = "Disney";
                for (let i = 1; i < rows.length; i++) {
                    const rowData = rows[i].split(',');
                    const movie = {};
                    for (let j = 0; j < headers.length; j++) {
                        movie[headers[j]] = rowData[j];
                    }
                    movie[headers[3]] = i - 1;
                    let disney = movie.Disney + "";
                    if (disney.includes('T')) {
                        movie.Disney = 'TRUE';
                    } else {
                        movie.Disney = 'FALSE';
                    }
                    allMovies.push(movie);
                    // console.log(movie);
                }
                displaySortedMovies(allMovies);
            })
            .catch(error => console.error('Error:', error));
            

function filterMovies() {
    let myFilteredMovies = [];
    const genreInput = document.getElementById('genre').value.toLowerCase();
    const ratingInput = document.getElementById('rating').value.toLowerCase();
    const platformInput = document.getElementById('platform').value.toLowerCase();

    allMovies.forEach(movie => {
        //console.log(movie.genres);
        let genresStr = movie.genres + "";
        let genreMatches = genresStr.toLowerCase().includes(genreInput) || !genreInput;
        let ratingStr = movie.vote_average + "";
        let ratingMatches = ratingStr.toLowerCase().includes(ratingInput) || !ratingInput;
        let platformMatches = !platformInput;

        if ((platformInput.includes('prime') || platformInput.includes('amazon')) && movie.Prime == 'TRUE') {
            platformMatches = true;
            //console.log("Streams on Prime");
        }
        if (platformInput.includes('netflix') && movie.Netflix == 'TRUE') {
            platformMatches = true;
            //console.log("Streams on Netflix");
        }
        if ((platformInput.includes('hbo') || platformInput.includes('max')) && movie.HBO_Max == 'TRUE') {
            platformMatches = true;
            //console.log("Streams on HBO Max");
        }
        if (platformInput.includes('disney') && movie.Disney == 'TRUE') {
            platformMatches = true;
            //console.log("Streams on Disney");
        }

        if (genreMatches && ratingMatches && platformMatches) {
            myFilteredMovies.push(movie);
        }
    });

    displaySortedMovies(myFilteredMovies);
}

function resetFilter() {
    document.getElementById('genre').value = "";
    document.getElementById('rating').value = "";
    document.getElementById('platform').value = "";
    displaySortedMovies(allMovies);
}

function displaySortedMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';  // Clear previous results

    // Display sorted movies
    movies.forEach(movie => {
        const titleItem = document.createElement('li');
        titleItem.innerHTML = `
                <a href="./details.html?id=${movie.id}">${movie.title}</a>
            `;
        movieList.appendChild(titleItem);
    });
}