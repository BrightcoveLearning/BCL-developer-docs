/*************************
switch for flash/html
*************************/
// for development purposes only: reopen page with HTML5 player
$("#switchToHTML5").on("click", function() {
    var separator = "?";
    if (document.location.href.indexOf("?", 0) > -1) {
     separator = "&";
    };
    window.location = document.location.href + separator + "forceHTML=true";
});
// for development purposes only: switch back to Flash
$("#switchToFlash").on("click", function () {
    var startOfQuery = document.location.href.indexOf("forceHTML", 0) -1;
    window.location = document.location.href.substring(0, startOfQuery);
});
