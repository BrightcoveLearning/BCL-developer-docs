---
layout: null
---

  var getUrlParam = function(e){var t = new RegExp("[?&]" + e.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"),a = t.exec(window.location.href);return a && a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : ""};
  var domain = location.hostname,
  site_domain,
  filter,
  lang_filter,
  lang = domain.split('.')[0],
  lang_prefix = '';

  if (lang === 'ja' || lang === 'ko' || lang === 'es' || lang === 'fr' || lang === 'de' || lang === 'zh-tw') {
    lang_prefix = lang + '.';
  } else {
    lang = 'en-us';
  }
  site_domain = lang_prefix + '{{ site.site_domain }}';
  filter = "domain='" + site_domain +  "'";
  lang_filter = "lang='" + lang + "'";
  console.log('filter', filter);
  console.log('lang_filter', lang_filter);
  
  var searchInterface = sajari.init({
      mode: "inline",
      project: "1588255093746585379", // Set this to your project.
      collection: "brightcove-documenation", // Set this to your collection.
      pipeline: "website",     // Set the search pipeline.
      instantPipeline: "autocomplete", // Set the instant pipeline.
      
      attachSearchBox: document.getElementById("results-search-box"), // DOM element to render search box.
      attachSearchResponse: document.getElementById("results-search-response"), // DOM element to render search results.
      inputPlaceholder: "Search", // Placeholder text for the search box.
      inputAutoFocus: false, // Focus the input element on render.
      maxSuggestions: 5, // Maximum number of suggestions to show.
      results: {"showImages": false }, // Configure the results.
      values: {"q.override": true, "resultsPerPage": "10","q": getUrlParam("q")}, // Set default values.
      tabFilters: {defaultTab:"This Site",tabs:[{title:"This Site",filter:filter}, {title:"All Brightcove Documentation",filter:lang_filter}]}, // User selectable filters
      styling: { theme: { colors: { brand: { primary: "#333" }}}}
  });
