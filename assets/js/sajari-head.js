(function() {
  function setup(c,a,f){function g(){var a=[],b=function(){a.push(arguments)};b.arr=a;c.sajari=c.sajari||{};c.sajari.ui=c.sajari.ui||[];c.sajari.ui.push(b);return b}var d=a.createElement("link");d.href=f;d.as="script";d.rel="preload";d.crossorigin=!0;var e=a.createElement("script");e.async=!0;e.src=f;a.head.appendChild(d);a.head.appendChild(e);a=g();a.init=function(a){var b=g();b(a);return b};return a};
  window.sajari = setup(window, document, "//cdn.sajari.net/js/integrations/website-search-1.4.js");
}());
