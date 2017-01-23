document.addEventListener('DOMContentLoaded', function () {

    var searchTerm = prompt('Please enter a word :)');
    searchTerm = searchTerm.trim().replace(/ /g, "+");

    request = new XMLHttpRequest;
    request.open('GET', 'http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=dc6zaTOxFJmzC');

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(request.responseText).data;
            if (data.length > 0) {
                document.getElementById("gif_zone").innerHTML = '<center><img src = "' + data[0].images.original.url + '" title="GIF via Giphy"></center>';
            }
        } else {
            console.log('reached giphy, but API returned an error');
        }

        jQuery(function () {
            $("#form-value").keyup(function () {
                var searchTerm = $("#form-value").val().trim().toLowerCase();
                $("#gif_zone").text(searchTerm);
            });
        });
    };

    request.onerror = function () {
        console.log('connection error');
    };

    request.send();
});
