fetch('movie_login.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const users = [];

            for (let i = 0; i < rows.length; i++) {
                const rowData = rows[i].split(',');
                const user = {};

                for (let j = 0; j < 2; j++) {
                    user[headers[j]] = rowData[j];
                }
                // console.log by id
                users.push(user);
            }
        })
    .catch(error => console.error('Error:', error));

function authenticate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
}