$(document).ready(function() {
    // Save the original background color
    var originalBodyBackgroundColor = $('body').css('backgroundColor');

    // Start off by hiding everything but the welcome text
    $('#game').hide();
    $('#thanks').hide();

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
            $('#currentimage').css('borderColor', '#0f0');
        } else if (key == 108) { // l key
            // #666 == rgb(102, 102, 102)
            // #333 == rgb(51, 51, 51)
            var alternateColor = 'rgb(51, 51, 51)';
            var oldColor = $('body').css('backgroundColor');
            if(oldColor != alternateColor) {
                $('body').css('backgroundColor', alternateColor);
            } else {
                $('body').css('backgroundColor', originalBodyBackgroundColor);
            }
        }
    });

    /*
    To change the image:
    $('#currentimage').attr('src', 'img/logo.png');
    */
});