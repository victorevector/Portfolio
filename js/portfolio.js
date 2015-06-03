var portfolio = {};
(function(portfolioObj) {

      portfolioObj.slideToggleEl= function(clickedEl, toggledEl) {
            $(clickedEl).on('click', function() {
                  $(toggledEl).slideToggle(delay=450);
            });
      };

      var projects = [ 
      {name: 'Fischer-Random Chess Position Generator', id: 'fischer', content: function(){ $('.modal-window').load('project-content/fischer.html'); } },
      {name: 'chatRoom', id: 'chatRoom', content: '' },
      {name: 'Amazon Price Scraper' , id: 'priceScraper' , content: '' },
      {name: 'Genetics and Drug Metabolism', id: '23andMe' , content: '' },
      {name: 'Durr-inspired Watch' , id: 'durr' , content: '' },
      ];

      portfolioObj.modalWindowInit = function (selectedId) {
            // CREATE WINDOW and ADD ANIMATION EFFECTS
            var initialSettings = {
                        'border': '5px solid' + FrameColor.randomColor(),
                        'height': '2px', 
                        'width': '2px',
                        'z-index': '1000',
                        'position': 'absolute',
                        'background-color': 'white',
                         } ;
            var $modalWindow = $('<div class="modal-window"></div>');
            $modalWindow.css( initialSettings ).prependTo('body');
            portfolioObj.center( $('body'), $modalWindow);
            $modalWindow.animate( {left:'20%', width:"60%", top:'10%', height: "80%"}, "slow"); 

            // ADD CLOSE FUNCTIONALITY TO WINDOW
            var $closeWindow = $('<div class="close"> <b>X</b> </div> ');
            var $closeFunction = $( "<script> $('.close').on('click', function() { portfolio.close($('.modal-window')); } ); </script>"); //ERROR PRONE BECAUSE portfolio is hardcoded as this module's name!
            $modalWindow.append( $closeWindow ).append($closeFunction);

            // ADD PROJECT CONTENT TO WINDOW
            var selectedProject;
            projects.forEach( function(cV){
                  if(selectedId == cV.id){ selectedProject = cV; }
            });
            // $modalWindow.append(selectedProject.content);
            selectedProject.content();
      };

      portfolioObj.close = function(el){
            var $modalWindow = el;
            $modalWindow.animate(
                  {left:'50%', right:'50%', width:"0%",top:'50%', bottom: '50%' ,height: "0%"},
                  "slow", 
                  function() { $modalWindow.remove(); } 
                  );
      }

      portfolioObj.center = function(refEl, el){
            var $window = refEl;
            var top = ($window.height() - el.height() ) /2;
            var left = ($window.width() - el.width() ) / 2;
            el.css( {
                  'top': ( top + $window.scrollTop() )/2,
                  'left': left  + $window.scrollLeft(),
                        } );
      };

      }) (portfolio);

      var FrameColor = ( function() {
            var colors = ["#FF6961", "#779ECB", "#FFD1DC", "#966FD6", "#CB99C9", "#C23B22", "#AEC6CF", "#FDFD96", "#03C03C", "#FFB347", "#B19CD9"];
            return {
                  randomColor: function(){
                        return colors[ Math.floor(Math.random() * colors.length) ];
                  }
            };
} ) ();


