function showRespect() {
    var respectMessage = document.getElementById("respect-message");
    respectMessage.style.display = "block"; // Show the message
    setTimeout(function() {
        respectMessage.style.display = "none"; // Hide after 2 seconds
    }, 1000);
}