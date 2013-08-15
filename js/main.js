$(document).ready(function () {
    // Save the original background color
    var originalBodyBackgroundColor = $('body').css('backgroundColor');

    // Set up navigation buttons
    $('#getstarted').click(function () {
        $('#welcome').hide();
        $('#game').show();
    });
    $('#quit').click(function () {
        $('#game').hide();
        $('#thanks').show();
    });

    $('#logo').click(function () {
        // #666 == rgb(102, 102, 102)
        // #333 == rgb(51, 51, 51)
        var alternateColor = 'rgb(51, 51, 51)';
        var oldColor = $('body').css('backgroundColor');
        if(oldColor != alternateColor) {
            $('body').css('backgroundColor', alternateColor);
        } else {
            $('body').css('backgroundColor', originalBodyBackgroundColor);
        }
    });

    // Set up keyboard commands
    $(window).keypress(function (e) {
        var key = e.which,
            imageUrls;
        if (key == 32) { // space bar
            e.preventDefault();
            if(!$('#currentimage').is(":visible")) {
                // Load and start the game
                imageUrls = ['img/test1.jpg', 'img/test2.jpg', 'img/test3.jpg', 'img/test4.jpg', 'img/test5.jpg', 'img/test6.jpg']; // This will be dynamic later
                $('#beforelevel').hide();

                preloadImages(imageUrls,
                    function () {
                        playGame(imageUrls, 1000, 1400);
                    }
                );
            } else {
                $('#seen').show();
            }
        }
    });
});

function playGame(imageUrls, displayTime, gapTime) {
    // TODO: Add a countdown

    // Display all of the imagess
    $.each(imageUrls, function (index, value) {
        $('#currentimage')
            .queue(function () { $(this).attr('src', value); $.dequeue(this); })
            .show(0)
            .delay(displayTime)
            .hide(0)
            .queue(function () { $(this).attr('src', ''); $.dequeue(this); }) // not really necessary
            .delay(gapTime)
            .queue(function () { $('#seen').hide(); $.dequeue(this); });
    });
    $('#currentimage').queue(function () { $('#beforelevel').show(); $.dequeue(this); });
}

// Based on http://stackoverflow.com/questions/476679/preloading-images-with-jquery
function preloadImages(imageUrls, callback) {
    var loadedImageUrls = [], img, i, imageLoaded,
        imageUrlCount = imageUrls.length;

    $('#loadedcount').html("0/" + imageUrlCount);
    $('#loading').show(0); // TODO: Perhaps don't show this if loading time is really fast.

    imageLoaded = function () {
        var loadedImageUrlCount;
        
        loadedImageUrls.push(imageUrls[i]);
        loadedImageUrlCount = loadedImageUrls.length;
        $('#loadedcount').html(loadedImageUrlCount + "/" + imageUrlCount);
        // If all images have loaded, hide the load screan and call the callback
        // TODO: Do something if not all images have loaded after a timeout
        if (loadedImageUrlCount === imageUrlCount) {
            $('#loading').hide(0);
            if(callback) {
                setTimeout(callback, 25);
            }
        }
    };
    
    for(i = 0; i < imageUrlCount; i++) {
        img = new Image();
        img.onload = imageLoaded;
        img.src = imageUrls[i];
    }
}
