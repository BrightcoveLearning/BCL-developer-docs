var searchBox = sajari.init({
  mode: "search-box",
  project: "1588255093746585379", // Set this to your project.
  collection: "brightcove-documenation", // Set this to your collection.
  instantPipeline: "autocomplete", // Pipeline used as you type
  inputPlaceholder: "Search", // Input element placeholder
  maxSuggestions: 5, // Maximum number of suggestions to show
  attachSearchBox: document.getElementById("nav-search-box") // DOM element to attach to
});

  searchBox("sub", "pipeline.search-sent", function (_, query) {
    window.location = "/search?q=" + encodeURIComponent(query.q);
  });