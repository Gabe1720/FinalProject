<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $rating = $_POST["rating"];
    $id = $_POST["id"];

    // Read the entire CSV file into an array
    $csvFile = file("./Database_files/ratings/ratings.csv");
    
    // Ensure the index is within the bounds of the array
    if ($id >= 0 && $id < count($csvFile)) {

        // Get the existing data for the specified row
        $row = str_getcsv($csvFile[$id]);

        // Extract existing values
        $totalRating = $row[0];
        $ratingQuantity = $row[1];

        // Update the values
        $newTotalRating = $totalRating + $rating;
        $newRatingQuantity = $ratingQuantity + 1;
        $newRatingAvg = $newTotalRating / $newRatingQuantity;

        // Modify the specific row in the array
        $csvFile[$id] = implode(',', [$newTotalRating, $newRatingQuantity, $newRatingAvg]) . PHP_EOL;

        // Write the updated content back to the CSV file
        file_put_contents("./Database_files/ratings/ratings.csv", implode('', $csvFile));

        // Redirect or display a success message
        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
        header("Location: movie_index.html");
        exit();
    }
}
?>
