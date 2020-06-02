var BCLS_talla_local_fix = ( function (window, document) {
  var domain = location.hostname,
  lang = domain.split('.')[0],
  talla_wrapper = document.getElementById('talla_wrapper');

  if (lang === 'ja' || lang === 'ko' || lang === 'es' || lang === 'fr' || lang === 'de' || lang === 'zh-tw') {
    talla_wrapper.setAttribute('style', 'display:none');
  }
})(window, document);
