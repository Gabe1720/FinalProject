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
        const movieList = document.getElementById('movie-list');
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.innerHTML = `
                <a href="./details2.html?id=${movie.id}">${movie.title}</a>
            `;
            movieList.appendChild(movieDiv);
        });
    })
.catch(error => console.error('Error:', error));