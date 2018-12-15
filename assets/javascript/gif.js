$(document).ready(function () {

    var topics = ["spongebob", "catdog", "hey arnold", "rugrats", "garfield and friends", "pokemon", "animaniacs", "doug", "aaahh!!! real monsters", "dexter's laboratory", "johnny bravo", "rocket power", "bobby's world", "sailor moon", "the magic school bus", "pinky and the brain", "rocko's modern life"];
    var addTopic = "";

    // Use a loop to append a button for each string in topics array
    function generateButtons() {
        $("#all-the-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>" + topics[i] + "</button>")
            button.addClass("topics-button");
            button.attr("data-name", topics[i]);
            $("#all-the-buttons").append(button);
        }
    };

    // User clicks on a button to generate 10 static, non-animated gif images from GIPHY API
    $("#all-the-buttons").on("click", ".topics-button", function () {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=ImcH6YQqsyNbic8FSK8MAxMNY3bkU7SW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            // testing
            console.log(response);

            var results = response.data;

            // display gif rating
            for (var i = 0; i < results.length; i++) {
                var topicsDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                // gif still and gif animates
                var topicsImage = $("<img>");
                topicsImage.addClass("gif");
                topicsImage.attr("src", results[i].images.fixed_height_still.url);
                topicsImage.attr("data-animate", results[i].images.fixed_height.url);
                topicsImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicsImage.attr("data-state", "still");

                // insert topicsImage at the end of div
                topicsDiv.append(topicsImage);

                // insert rating paragraph at the end of div
                topicsDiv.append(p);

                // new gifs are displayed at top
                $("#gif-display").prepend(topicsDiv);
            }
        })
    })

    // animate gif on click
    $("#gif-display").on("click", ".gif", function (event) {
        event.preventDefault();

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "data-animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })

    // Add new topic to topics array
    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        // Grab the input from the textbox and push new topic
        addTopic = $("#gif-input").val().trim();
        topics.push(addTopic);
        generateButtons();
    })

    generateButtons();

});


