<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Create or open the CSV file for reading and writing
    $csvFile = fopen("./Database_files/accounts/accounts.csv", "a+"); // "a" for append mode

    // Check if the combination already exists
    $valid = false;
    while ($row = fgetcsv($csvFile)) {
        if ($email === $row[0] && $password === $row[1]) {
            $valid = true;
            break;
        }
    }

    // Close the CSV file
    fclose($csvFile);

    // Redirect or display a success message
    if ($valid) {
        header("Location: movie_index.html");
        exit();
    } else {
        header("Location: invalid.html");
        exit();
    }

    exit();
}
?>
