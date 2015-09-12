// NEED TO ADD:
    // Re: rf.rightToggle()
    //  clicking the <a> inside navbar will jump to correct div section
    // currently, initiating event + clicking link != jump to section; it only initiates callback function

var roundFeather = {};
(function (rf) {
    var $ = jQuery;
    var leftDiv = $('#hDHMenuDiv');
    var rightDiv = $('#hScrollDiv');
    var leftTopPadding = 0;
    var rightTopPadding = 15;
    var navMenu = $('#navigationMenu');
    var navLi = navMenu.children()
    var navButtons = navMenu.children().children();
    var navText = navMenu.children().children().children();
    var eventSource = null;
    var logo = $('.image-logo');

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

    rf.rightToggle = function(){
        // Adds event listener to navbar. Click event will call the function, controller,
        // and pass it event object.
        navMenu.on('click', controller)
    }

    function controller(event) {
        // callback function to event listener created in rf.rightToggle()
        // This function will either 'open' or 'close' the rightDiv depending
        // on the event target.
        // event.target == eventSource?  'close' : 'open'
        // eventSource is binded to this module.
        // eventSource keeps track of what navbuttons have been clicked

        event.target == eventSource ? closeDiv() : openDiv();

        function openDiv(){
            eventSource = event.target;
            var css = {'width': '50%'};
            leftDiv.animate(css, {'start': openRightDiv });

            function openRightDiv() {
                rightDiv.animate(css, function(){
                    rightDiv.show();
                    rf.setCorrectDivHeight(rightDiv, rightTopPadding); //makes sure the rightDiv is not blocked by the menu && does not cut off at the bottom
                    window.location = event.target.href; //opens up the proper link upon rightDiv's reveal
                });
            }
        }

        function closeDiv(){
            leftDiv.animate({'width': '100%'}, {'start': closeRightDiv });
            eventSource = null;
            function closeRightDiv(){
                rightDiv.animate({'width': '0%'}, rightDiv.hide)
            }
        }
    }

    rf.setCorrectDivHeight = function (div, divTopPadding) {
        // Right container is set too low and get bottom cut off
        // Always: Doc.height() - Menu.height() = Right.height()
        // Right.css('top') == Menu.height() + some padding

        divTopPadding = typeof divTopPadding !== 'undefined' ? divTopPadding : 15;
        var docHeight = $(document).height();
        var hHeight = $('header').height();
        var rightHeight = docHeight - hHeight;
        div.css({
            'height': String( rightHeight - divTopPadding ) + 'px' ,
            'top': String(hHeight) + 'px',
            'padding-top': String(divTopPadding) + 'px',
        });
    }

    rf.resizeCorrectDivHeight = function (div, divTopPadding) {
        $(window).on('resize', function(){
            rf.setCorrectDivHeight(div, divTopPadding);
        });
    }

    rf.resizeLogo = function () {
        $(window).on('resize', function(){
            logo.css('height', '60px');
        });
    }

    rf.initSetLayout = function (pageTitle) {
        rf.startingPositionsInit(); //Left Div takes up 100% of screen. Right Div is hidden
        rf.resizeNavbar(pageTitle); //Menu Navbar is resized to fit screen
        rf.rightToggle(); //Event handler that toggles the Right Div when NavBar is clicked
        rf.resizeCorrectDivHeight(rightDiv, rightTopPadding); //Event handler- resizes Div Height & Top in relation to Header
        rf.resizeCorrectDivHeight(leftDiv, leftTopPadding);
        rf.resizeLogo(); //Makes sure logo stays a constant height of 60px regardless of window size
        logo.css('height', '60px'); //Like resize BUT no resize event needed.
        $('.sp-mobile-menu').css('top', '30px'); //Solves problem of negative space between header & toggle menu
    }
})(roundFeather);
