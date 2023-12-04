function addComment() {
    var commentInput = document.getElementById('comment-input');
    var commentText = commentInput.value;

        fetch('./Database_files/comments/comments.csv');

    if (commentText.trim() !== '') {
        var commentContainer = document.getElementById('previous-comments');
        var noCommentsMessage = document.getElementById('no-comments-message');

        // Check if the "no comments" message is visible and hide it
        if (noCommentsMessage && noCommentsMessage.style.display !== 'none') {
            noCommentsMessage.style.display = 'none';
        }

        // Get the current time
        var currentTime = new Date();
        var timestamp = currentTime.toLocaleString();
        // Create a new comment element
        var newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = '<span class="username">Anonymous:</span> ' + commentText +
                                '<span class="timestamp"> (' + timestamp + ')</span>';
        // Append the new comment to the comments container
        commentContainer.appendChild(newComment);

        // Write comment to file

        // Clear the comment input field
        commentInput.value = '';
    }
}
