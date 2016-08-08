/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);

/**
 * JS for Quixote
 */


// Night Mode

 window.onload = function(){
  //  var currentTime = new Date().getHours();
  //  if (currentTime < (6))
  //    document.body.classList.add('nightmode');
  //  if (currentTime > (6+12))
  //    document.body.classList.add('nightmode');

   var toggleButton = document.getElementById('nightmode-toggle');
   function handleToggle() {
     document.body.classList.toggle('nightmode');
   }

   toggleButton.addEventListener('click', handleToggle);
 };


 // Availability link

 (function loadData(){
     var anchor = document.getElementById("availabilityLink");
     var xhr = new XMLHttpRequest();
     xhr.open("GET", "https://my.cushionapp.com/api/v1/users/7c6d447d-4904-402b-b154-08077b3220fb/availability");
     xhr.addEventListener('load', function() {
         var label = "currently unavailable";
         if (xhr.status >= 200 && xhr.status < 300) {
             try {
                 var parsed = JSON.parse(xhr.response);
                 var weekInMs = 7*24*60*60*1000;
                 var timeToAvailable = new Date(parsed.availability.available_on) - new Date();

                 if (timeToAvailable < weekInMs) label = "available";
                 else if (timeToAvailable < weekInMs*4) label = "available soon";
             } catch(e) { console.error(e); }
         }
         anchor.innerText = label;
     });
     xhr.send();
 })();
