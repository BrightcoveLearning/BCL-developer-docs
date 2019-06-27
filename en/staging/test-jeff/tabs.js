jQuery(document).ready(function () {

  jQuery('.tabs .tab-links a').on('click', function (e) {
    var currentAttrValue = jQuery(this).attr('href');
    var base = jQuery(this);
    console.log("current attr value: ", currentAttrValue);
    console.log("base: ", base);
    // prevent default click action for links
    e.preventDefault();
    // Show/Hide Tabs
    jQuery('.tabs ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
    // Change/remove current tab to active
    jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

    // Change window location to add URL params
  	if (window.history && history.pushState) {
  	  // NOTE: doesn't take into account existing params
  		history.replaceState("", "", currentAttrValue);
  	}

    var queryString = {};
  	window.location.href.replace(
  	    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
  	    function($0, $1, $2, $3) { queryString[$1] = $3; }
  	);
    // if (queryString[base.options.param]) {
    //
    // 	var tab = $("a[href='#" + queryString[base.pathname] + "']");
    //
    // 	tab
    // 		.closest(".nav")
    // 		.find("a")
    // 		.removeClass("active")
    // 		.end()
    // 		.next(".list-wrap")
    // 		.find("ul")
    // 		.hide();
    // 	tab.addClass("active");
    // 	$("#" + queryString[base.pathname]).show();
    //
    // }

    // var h = window.location.hash,
    // tabLinks = document.querySelectorAll('.tabs .tab-links a');
    //
    // if (h.length > 0) {
    //   var iMax = tabLinks.length,
    //     i;
    //   for (i = 0; i < iMax; i++) {
    //     if (tabLinks[i].getAttribute('href') === h) {
    //       tabLinks[i].click();
    //     }
    //   }
    // }
  });


});
