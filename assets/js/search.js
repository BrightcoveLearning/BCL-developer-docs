const myInitCallback = function() {
  if (document.readyState == 'complete') {
    // Document is ready when CSE element is initialized.
    // Render an element with both search box and search results 
    google.search.cse.element.render({div: 'search_box', tag: 'search'});

    var searchbox_el=document.getElementById('gsc-i-id1');
    console.log('searchbox_el', searchbox_el);
    
    searchbox_el.setAttribute('style', 'background-image:none;');
    searchbox_el.setAttribute('placeholder', 'Search Brightcove docs');
    searchbox_el.addEventListener('click', function() {
      searchbox_el.setAttribute('style', 'background-image:none;');
      searchbox_el.setAttribute('placeholder', 'Search Brightcove docs');
    });
  } else {
    // Document is not ready yet, when CSE element is initialized.
    google.setOnLoadCallback(function() {
       // Render an element with both search box and search results in div with id 'test'.
        google.search.cse.element.render({div: 'search_box', tag: 'search'});
        var searchbox_el=document.getElementById('gsc-i-id1');
        console.log('searchbox_el', searchbox_el);
        
    var searchbox_el=document.getElementById('gsc-i-id1');
    console.log('searchbox_el', searchbox_el);
    
    searchbox_el.setAttribute('style', 'background-image:none;border:none');
    searchbox_el.setAttribute('placeholder', 'Search Brightcove docs');
    searchbox_el.addEventListener('click', function() {
      searchbox_el.setAttribute('style', 'background-image:none;border:none');
      searchbox_el.setAttribute('placeholder', 'Search Brightcove docs');
    });
    
    }, true);
  }
};

// Insert it before the CSE code snippet so the global properties like parsetags and callback
// are available when cse.js runs.
window.__gcse = {parsetags: 'explicit',initializationCallback: myInitCallback};
 