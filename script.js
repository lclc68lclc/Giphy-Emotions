$(document).ready(function() {
    //array of feels
    var feelings = ["happy", "sad", "sleepy", "cranky", "tired", "goofy"];
    //renders html to display gifs
    function displayGifs() {
        var giph = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giph + "&limit=10&api_key=14879a1b48bd4b6b9046185c315d3b40";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gifs'>");

                var pOne = $("<p>").text("Rating: " + results[i].rating);

                gifDiv.append(pOne);

                var animatedUrl = results[i].images.fixed_height.url;

                var stillUrl = results[i].images.fixed_height_still.url;

                var image = $("<img class='gif'>").attr("src", stillUrl);

                image.attr("data-state", "still");
                image.attr("data-still", stillUrl);
                image.attr("data-animate", animatedUrl);

                gifDiv.append(image);

                $("#giphy-view").prepend(gifDiv);
            }

        })
    }

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < feelings.length; i++) {
            var b = $("<button>");
            b.addClass("feeling");
            b.attr("data-name", feelings[i]);
            b.text(feelings[i]);
            $("#buttons-view").append(b);
        }
    }

    $("#add-giphy").on("click", function(event) {
        event.preventDefault();

        var feeling = $("#giphy-input").val();

        feelings.push(feeling);
        renderButtons();
    });

    function animateGif() {
        $(".gif").on("click", function(event) {
            event.preventDefault();
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    }
    $(document).on("click", ".feeling", displayGifs);
    $(document).on("click", ".gif", animateGif);
    renderButtons();
})