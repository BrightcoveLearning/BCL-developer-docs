var BCLSredirect = ( function (window, document) {
  var href = window.location.href,
    newHref = href.replace('apidoc.html', 'index.html'),
    ts;

    function redirect() {
      window.location.href = newHref;
    }

    ts = window.setTimeout(redirect, 5000);
})(window, document);
