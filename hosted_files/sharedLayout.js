// NEED TO ADD:
    // Re: rf.rightToggle()
    //  clicking the <a> inside navbar will jump to correct div section
    // currently, initiating event + clicking link != jump to section; it only initiates callback function

var roundFeather = {};
(function (rf) {
    var leftDiv = jQuery('#hDHMenuDiv');
    var rightDiv = jQuery('#hScrollDiv');
    var navMenu = jQuery('#navigationMenu');
    var navLi = navMenu.children()
    var navButtons = navMenu.children().children();
    var navText = navMenu.children().children().children();

    rf.resizeNavbar = function resizeNavbar(pageTitle) {
        // Resizes the navbar given a page title.
        // Matches title with relevant css properties
        // Case Studies is the only page with different navbar button dimensions

        if (pageTitle == 'case studies') {
            navButtons.css({
                'height': '100px',
                'width': '100px',
            });

            navText.css({
                'line-height': '175px',
                'font-size': '12px',

            });

            navLi.css({
                'height': '100%',
                'width': '100%',
            });
        }
        else {
            navButtons.css({
                'height': '128px',
                'width': '128px',
            });

            navText.css({
                'line-height': '200px',
                'font-size': '12px',

            });

            navLi.css({
                'height': '100%',
                'width': '100%',
            });
        }
    }

    rf.startingPositionsInit = function () {
        // Defines the page's left and right container starting positions
        // Left container spans the whole width and Right container is hidden
        // until the one of the navbars are clicked
        rightDiv.hide();
        leftDiv.css({ 'width': '100%' });
    }

    rf.rightToggle = function () {
        // Adds event listener to navbar. Click event will trigger the following
        // sequence of events:
        // leftDiv's width returns to 50%
        // rightDiv returns from hidding

        navMenu.on('click', function () {
            leftDiv.css('width', '50%');
            rightDiv.show();
        });
    }

    rf.initSetLayout = function (pageTitle) {
        rf.startingPositionsInit();
        rf.resizeNavbar(pageTitle);
        rf.rightToggle();
    }
})(roundFeather);
