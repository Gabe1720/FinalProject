function search() {
    var keyword = document.getElementById("keyword").value;
    console.log("keyword: " + keyword);
    var result = document.getElementById("results");
    if (keyword == "") {
        result.innerHTML = "Please enter a movie title or keyword";
    } else {
        result.innerHTML = "Search results for \"" + keyword + "\": ";
    }
    fetch('./Database_files/movies_metadata.csv/movies_metadata.csv')
.then(response => response.text())
.then(data => {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = "";
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
        
        // If title and overview for this movie are not null
        if (movie[headers[6]] && movie[headers[7]]) {
            // Make search case insensitive
            const titleLowerCase = movie[headers[6]].toLowerCase();
            const overviewLowerCase = movie[headers[7]].toLowerCase();
            keyword = keyword.toLowerCase();

            // Check if keyword is in title or overview
            if (titleLowerCase.includes(keyword) || overviewLowerCase.includes(keyword)) {
                // Set movie id
                movie[headers[3]] = i - 1;

                movies.push(movie);
                console.log(movie);
            }
        }
        
        
    }
    // console.log(movies);
    
    // Display movie data
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.innerHTML = `
       <a href="./details.html?id=${movie.id}">${movie.title}</a>
        `;
        movieList.appendChild(movieDiv);
    });
})
.catch(error => console.error('Error:', error));
}
