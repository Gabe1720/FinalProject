const source = new String("https://filmartgallery.com/cdn/shop/products");
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
document.getElementById("movieID").setAttribute("value", movieId);
var disney = "";
fetch('movies_metadata.csv')
    .then(response => response.text())
    .then(data => {
        // Parse CSV data
        const rows = data.split('\n');
        const headers = rows[0].split(',');
        headers[22] = "Disney";
        disney = headers[22];
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
                    <ul id="platforms"></ul>
            `;
            }
            console.log("showing platforms");
            // Create a new li elements
            var listItem1 = document.createElement('li');
            var link1 = document.createElement('a');
            link1.setAttribute("href", "https://www.amazon.com/Amazon-Video/b?ie=UTF8&node=2858778011");
            link1.textContent = "Prime";
            listItem1.appendChild(link1);

            var listItem2 = document.createElement('li');
            var link2 = document.createElement('a');
            link2.setAttribute("href", "https://www.netflix.com/");
            link2.textContent = "Netflix";
            listItem2.appendChild(link2);

            var listItem3 = document.createElement('li');
            var link3 = document.createElement('a');
            link3.setAttribute("href", "https://www.max.com/");
            link3.textContent = "Max";
            listItem3.appendChild(link3);

            var listItem4 = document.createElement('li');
            var link4 = document.createElement('a');
            link4.setAttribute("href", "https://www.disneyplus.com/");
            link4.textContent = "Disney";
            listItem4.appendChild(link4);

            let platformList = document.getElementById("platforms");
            // platformList.innerHTML = "<li>FIRST PLATFORM</li>";
            // use if statements to check for each platform, is this movie on that platform?
            if (movies[movieId].Prime == "TRUE") {
                platformList.appendChild(listItem1);
            }
            if (movies[movieId].Netflix == "TRUE") {
                platformList.appendChild(listItem2);
            }
            if (movies[movieId].HBO_Max == "TRUE") {
                platformList.appendChild(listItem3);
            }
            let disneyResult = movies[movieId].Disney;
            if (disneyResult.includes('T')) {
                console.log(`Streams on ${disney}`);
                platformList.appendChild(listItem4);
            } else {
                console.log(`Does not strean on ${disney}`);
                //console.log(movies[movieId].Disney);
            }
    })
.catch(error => console.error('Error:', error));