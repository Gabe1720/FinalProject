const source = new String("https://filmartgallery.com/cdn/shop/products");
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
fetch('movies_metadata.csv')
    .then(response => response.text())
    .then(data => {
        // Parse CSV data
        const rows = data.split('\n');
        const headers = rows[0].split(',');
        const movies = [];

        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',');
            const movie = {};

            for (let j = 0; j < headers.length; j++) {
                movie[headers[j]] = rowData[j];
            }

            // console.log by id
            movie[headers[3]] = i - 1;
            movies.push(movie);
            console.log(movie);
        }

        // Display movie data
        const movieDetails = document.getElementById('movie-details');
        if ((movieId <= 110) & (movieId >= 0)) {
            // Display movie data
            const movieDetails = document.getElementById('movie-details');

            movieDetails.innerHTML = `
                <h1>${movies[movieId].title}</h1>
                    <p>${movies[movieId].overview}</p>
                    <p>Runtime: ${movies[movieId].runtime} minutes</p>
                    <p>Release Date: ${movies[movieId].release_date}</p>
                    <p>Rating: ${movies[movieId].vote_average}</p>
                <h1>"Where can I watch it?"</h1>
                    <!-- Streaming info - port in streaming platforms and their corresponding links from a database into an unordered list-->
                    <ul> </ul>
            `;
            }
    })
.catch(error => console.error('Error:', error));