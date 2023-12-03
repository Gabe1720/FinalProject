<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Create or open the CSV file for reading and writing
    $csvFile = fopen("./Database_files/accounts/accounts.csv", "a+"); // "a" for append mode

    // Check if the combination already exists
    $unique = true;
    while ($row = fgetcsv($csvFile)) {
        if ($email === $row[0] || $password === $row[1]) {
            $unique = false;
            break;
        }
    }

    if ($unique) {
        // Move the file pointer to the end before writing
        fseek($csvFile, 0, SEEK_END);

        // Write data to the CSV file
        fputcsv($csvFile, [$email, $password]);
    }

    // Close the CSV file
    fclose($csvFile);

    // Cookie Variables
    $cookie_name = "user";
    $cookie_value = $email;

    // Redirect or display a success message
    if ($unique) {
        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
        header("Location: movie_index.html");
        exit();
    } else {
        header("Location: duplicate.html");
        exit();
    }

    exit();
}
?>
