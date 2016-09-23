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

 // Last FM Pull

 $(document).ready(function() {
  var url = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=taurean_&api_key=48bb9c8d732085945548a187b7fe994c&format=json";
  $.getJSON(url, function(data) {
    var artist = data.recenttracks.track[0].artist["#text"];
    var song = data.recenttracks.track[0]["name"];
    var cover = data.recenttracks.track[0].image[3]["#text"];

    $('#last-fm').html("\""+song+ '" by ' +artist);
  });
});
