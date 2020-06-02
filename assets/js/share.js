var BCLS_share = ( function (window, document, BCLS_toc, Prism) {
  console.log('shared_content', shared_content);
  var domain = location.hostname,
  lang = domain.split('.')[0],
  lang_prefix = '';

  if (lang === 'ja' || lang === 'ko' || lang === 'es' || lang === 'fr' || lang === 'de' || lang === 'zh-tw') {
    lang_prefix = lang + '.';
  }


  window.onload = function() {
    var gen_site = 'https://' + lang_prefix + 'general.support.brightcove.com';
    console.log('site url', gen_site);
    
    $(function() {
        $('#bcls_article').load(gen_site + shared_content, after_content_load);
      });
    function after_content_load() {
      BCLS_toc.create_inpage_nav();
      Prism.highlightAll();
    }
  };
})(window, document, BCLS_toc, Prism);