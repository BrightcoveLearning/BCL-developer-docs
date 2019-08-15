(function ($) {
	$(document).on('ready', function () {
		var start = 'window.mountCurrentStatus(',
			end = ');',
			status = 0,
			height = $(window).height(),
			dheight = $(document).height(),
			fheight = $('footer').outerHeight(),
			mobileThreshold = 1225,
			scrollDirection = 0,
            lastScrollDirection = 0,
            lastScroll = 0,
            $window = $(window);

		var fix_resize = function() {
			height = $window.height();
			dheight = $(document).height();
			fheight = $('footer').outerHeight();
		}

		$.get('https://status.ooyala.com/w/status', function (res) {
			res = res.substr(res.indexOf(start) + start.length);
			res = res.substr(0, res.indexOf(end));
			res = JSON.parse(res);
			$('#system-status').addClass('type_'+res.statusType);
			$('.status-text').html("<h3>"+res.currentStatus+"</h3>"+res.inEffectSince);
		});
		$('#search').submit(function (e) {
			e.preventDefault();
			window.location = $(this).attr("action") + $('#search_text').val();
		});

		$('<div class="toggler"></div>').insertBefore($('aside ul.menu > li.expanded > a'));

		$('.expanded:not(.active-trail)').addClass('closed');
		$('.expanded.active-trail').addClass('open');
		$('.expanded > .toggler').click(function (e) {
			e.preventDefault();
			$(this).parent().toggleClass('open closed');
		});

		$('.easy-breadcrumb_segment-separator').last().remove();

		setTimeout(function () {
			/* Increase content size if necesary */
			var $aside = $('.l-content aside');
			var $content = $('.l-content article');

			var asideHeight = $aside.height();
			var contentHEight = $content.height();

			if (asideHeight > contentHEight) {
				$content.height(asideHeight);
			}

			$aside.addClass('fix');
		}, 1000);

		$('.menu-title').click(function () {
			$(this).toggleClass('open');
			$('.l-main aside').slideToggle();
		});

        $window.resize(function () {
			fix_resize();
		});

        $window.scroll(function () {
            var isMobileWidth = $window.width() < mobileThreshold;
            var actualScrollPosition = $window.scrollTop();
            var header_scroll = 42;
			var scrollTop =  dheight - height - fheight - $window.scrollTop() ;
            var scroll_target = $("#system-status");
			if (scrollTop < 0 && height < 900) {
				$('aside').addClass('stop_fix').css({top: '810px'});
			} else {
				$('aside').removeClass('stop_fix').css({top: 'auto'});
			}

            if(actualScrollPosition > 70 && !isMobileWidth) {
                scroll_target.addClass('scrolling');
                if( actualScrollPosition > lastScroll) {
                    scroll_target.addClass('scrollDown');
                    scrollDirection = 1;
                    if(scrollDirection !== lastScrollDirection) {
                        scroll_target.addClass('scrollDown');
                    }
                } else {
                    scrollDirection = -1;
                    if(scrollDirection !== lastScrollDirection) {
                        scroll_target.removeClass('scrollDown');
                    }
                }
                lastScroll = actualScrollPosition;
                lastScrollDirection = scrollDirection;
            } else {
                scroll_target.removeClass('scrolling');
            }
		});


	});
}(jQuery));
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox') && (Drupal.settings.googleanalytics.trackColorbox)) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Downloads",
            "eventAction": Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),
            "eventLabel": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", {
            "hitType": "pageview",
            "page": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Mails",
            "eventAction": "Click",
            "eventLabel": this.href.substring(7),
            "transport": "beacon"
          });
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode !== 2 || (Drupal.settings.googleanalytics.trackDomainMode === 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", {
              "hitType": "event",
              "eventCategory": "Outbound links",
              "eventAction": "Click",
              "eventLabel": this.href,
              "transport": "beacon"
            });
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga("send", {
        "hitType": "pageview",
        "page": location.pathname + location.search + location.hash
      });
    };
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.googleanalytics.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        ga("send", {
          "hitType": "pageview",
          "page": Drupal.googleanalytics.getPageUrl(href)
        });
      }
    });
  }

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
