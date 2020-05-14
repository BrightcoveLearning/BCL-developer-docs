var getUrlParam = function(e){var t = new RegExp("[?&]" + e.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"),a = t.exec(window.location.href);return a && a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : ""};
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
    tabFilters: null, // User selectable filters
    styling: { theme: { colors: { brand: { primary: "#333" }}}}
});