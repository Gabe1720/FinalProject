<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $comment = $_POST["comment"];

    // Create or open the CSV file for reading and writing
    $csvFile = fopen("./Database_files/comments/comments.csv", "a+"); // "a" for append mode


    // Move the file pointer to the end before writing
    fseek($csvFile, 0, SEEK_END);

    // Write data to the CSV file
    fputcsv($csvFile, [$comment]);
 

    // Close the CSV file
    fclose($csvFile);

    // Redirect or display a success message
    header("Location: comments.html");
    exit();


    exit();
}
?>
