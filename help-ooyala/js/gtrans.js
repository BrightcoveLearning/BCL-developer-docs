function doGTranslate(lang_pair) {console.log('lang_pair', lang_pair);if(lang_pair.value)lang_pair=lang_pair.value;var domain = location.hostname;var lang=lang_pair.split('|')[1];var plang=domain.split('.')[0];if(plang.length !=2 && plang != 'zh-CN' && plang != 'zh-TW')plang='en';if(lang !== 'en')location.hostname=lang + '.' +domain;}

function keepLanguage() {
  var plang=location.hostname.split('.')[],
    domain = 'https://docs.brightcove.com/help-ooyala',
    all_links = document.querySelectorAll('a[href]'),
    i,
    iMax,
    newPath = plang + '.' + domain;
  if (plang.length === 2 || plang === 'zh-CN' || plang === 'zh-TW') {
    iMax = all_links.length;
    for (i = 0; i < iMax; i++) {
      var href = absolute(all_links[i].getAttribute('href'));
      all_links[i].setAttribute('href', href.replace('help-ooyala.brightcove.com', newPath));
    }
  }
}

function absolute(relative) {
  var base = location.href;
  if (relative.indexOf('//') === -1) { 
    var stack = base.split("/"),
      parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                  // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
      if (parts[i] == ".") {
        continue;
      }
      if (parts[i] == "..") {
        stack.pop();
      } else {
        stack.push(parts[i]);
      }
    }
    return stack.join("/");
  } else {
    return relative;
  }
}