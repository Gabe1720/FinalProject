function authenticate() {
	// const urlParams = new URLSearchParams(window.location.search);
	console.log("I get here");
	fetch("Database_files/accounts/accounts.csv").then(response => response.text()).then(data => {
        // Parse CSV data
        const rows = data.split('\n');
        const headers = rows[0].split(',');
        users = [];
		
		console.log("I find the file");
            // Info
	    var username = document.getElementById("email").value;
    	var password = document.getElementById("password").value;

		console.log("I remember how to log things");
        for (let i = 0; i < rows.length; i++) {
                	const rowData = rows[i].split(',');
		for (let j = 0; j < 2; j++) {
            		users[headers[j]] = rowData[j];
				if ((users[0] == username) && (users[1] == password)) {
					setCookie("user", username, 20);
					location.replace("./movie_index.html");
				}
        	}
	}
	location.replace("./invalid.html");
    })
	.catch(error => console.error('Error:', error));
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
