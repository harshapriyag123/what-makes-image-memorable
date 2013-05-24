// Game state
var gameInProgress = false;


$(document).ready(function() {
    // Save the original background color
    var originalBodyBackgroundColor = $('body').css('backgroundColor');

    // Start off by hiding everything but the welcome text
    $('#game').hide();
    $('#thanks').hide();

    // Hide game components by default
    $('#currentimage').hide();
    $('#seen').hide();

    // Set up navigation buttons
    $('#getstarted').click(function() {
        $('#welcome').hide();
        $('#game').show();
    });
    $('#quit').click(function() {
        $('#game').hide();
        $('#thanks').show();
    });

    $('#logo').click(function() {
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
    $(window).keypress(function(e) {
        var key = e.which;
        if (key == 32) { // space bar
            e.preventDefault();
            if(!gameInProgress) {
                playGame(['img/test1.jpg', 'img/test2.jpg', 'img/test3.jpg', 'img/test4.jpg', 'img/test5.jpg', 'img/test6.jpg'], 1000, 1400);
            } else {
                $('#seen').show();
            }
        }
    });
});

function playGame(imageURLs, displayTime, gapTime) {
    $('#currentimage').queue(function() { gameInProgress = true; $('#beforelevel').hide(); $.dequeue(this); });
    // Display all of the imagess
    $.each(imageURLs, function(index, value) {
        $('#currentimage')
            .queue(function() { $(this).attr('src', value); $.dequeue(this); })
            .show(0)
            .delay(displayTime)
            .hide(0)
            .queue(function() { $(this).attr('src', ''); $.dequeue(this); }) // not really necessary
            .delay(gapTime)
            .queue(function() { $('#seen').hide(); $.dequeue(this); });
    });
    $('#currentimage').queue(function() { gameInProgress = false; $('#beforelevel').show(); $.dequeue(this); });

}