<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $rating = $_POST["rating"];
    $id = $_POST["id"];

    // Read the entire CSV file into an array
    $csvFile = file("./Database_files/ratings/ratings.csv");

    // Read the entire CSV file into an array
    $movieFile = file("./Database_files/movies_metadata.csv/movies_metadata.csv");
    
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

        $newId = $id + 1;

        // Use fopen and fwrite to update the movieFile
        $fileHandle = fopen("./Database_files/movies_metadata.csv/movies_metadata.csv", "r+");
        fseek($fileHandle, 0);
        
        for ($i = 0; $i < count($movieFile); $i++) {
            if ($i == $id + 1) {
                $movieRow = str_getcsv($movieFile[$i]);
                $vote_avg = $movieRow[17];
                $vote_count = $movieRow[18];
                $defaultTotal = $vote_avg * $vote_count;
                $newVoteTotal = $vote_count + 1;
                $newVoteAvg = ($defaultTotal + $rating) / $newVoteTotal;
                $line = implode(',', [
                    $movieRow[0], $movieRow[1], $movieRow[2], $movieRow[3], $movieRow[4], $movieRow[5], $movieRow[6],
                    $movieRow[7], $movieRow[8], $movieRow[9], $movieRow[10], $movieRow[11], $movieRow[12], $movieRow[13],
                    $movieRow[14], $movieRow[15], $movieRow[16], $newVoteAvg, $newVoteTotal, $movieRow[19],
                    $movieRow[20], $movieRow[21], $movieRow[22]
                ]) . PHP_EOL;
        
                fwrite($fileHandle, $line);
            } else {
                fwrite($fileHandle, $movieFile[$i]);
            }
        }
        
        fclose($fileHandle);

        
        // Redirect or display a success message
        // setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
        header("Location: details.html?id=" . $id);

        exit();
    }
}
?>
