var navArray = [
  {oldURL:'https://docs.brightcove.com/analytics-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/analytics/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/audience-api/v1/doc/index.html', newURL:'https://docs.brightcove.com/audience-api/v1/doc/index.html'},
  {oldURL:'https://docs.brightcove.com/cms-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/cms/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/data-collection-api/v2/doc/index.html', newURL:'https://apis.support.brightcove.com/data-collection/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/delivery-system-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/delivery-system/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/dynamic-ingest-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/dynamic-ingest/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/ingest-profiles-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/ingest-profiles/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/in-page-experience-api/v1/doc/index.html', newURL:'https://gallery.support.brightcove.com/develop/reference.html'},
  {oldURL:'https://docs.brightcove.com/oauth-api/v4/doc/index.html', newURL:'https://apis.support.brightcove.com/oauth/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/playback-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/playback/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/player-management-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/player-management/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/ssai-api/v1/doc/index.html', newURL:'https://ssai.support.brightcove.com/vod/references/reference.html'},
  {oldURL:'https://docs.brightcove.com/social-api/v1/doc/index.html', newURL:'https://social.support.brightcove.com/develop/reference.html'},
  {oldURL:'https://docs.brightcove.com/mrss-config-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/social-syndication/references/configuration-reference.html'},
  {oldURL:'https://docs.brightcove.com/mrss-feed-api/v1/doc/index.html', newURL:'https://apis.support.brightcove.com/social-syndication/references/feed-reference.html'}
],
cdiv = document.getElementById('message'),
      new_location,
      message,
      qLang,
      i,
      iMax = navArray.length,
      path = window.location.href;
      console.log('path', path);

      // prevent redirect from home page
        for (i = 0; i < iMax; i++) {
          item = navArray[i];
          // console.log('item', item);
          
          if (path === item.oldURL) {
              new_location = item.newURL;
            }
            console.log('newURL', new_location);
            message = '<p class="bcls-aside bcls-aside--warning" style="font-weight:bold;font-size:x-large">This page is obsolete and no longer updated. In 5 seconds, you will be redirected to the new page, and please update your bookmark: <a href="' + new_location +  '">' + new_location + '</a></p>';
            cdiv.insertAdjacentHTML('afterbegin', message);
            redirect();
            break;
          }
        
        // no match, go home
        console.log('i', i);
        console.log('iMax', iMax);
      
      
      if (i === iMax - 1) {
        new_location = 'https://' + qLang + 'support.brightcove.com';
        message = '<aside style="padding:5px;border:2px #cc0000 solid;background-color:rgb(176, 176, 108);font-weight:bold;font-size:x-large">This page is obsolete and no longer updated. In 5 seconds, you will be redirected to the home page, where you can try to search for or navigate to the page you are looking for.</aside>'
        cdiv.insertAdjacentHTML('afterend', message);
        redirect();
      }

      function redirect() {
        var t = window.setTimeout(go_to_new_location, 5000);
      }

      function go_to_new_location() {
        window.location.href = new_location;
      }