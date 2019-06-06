var BCLS = (function (window, document) {
  var $submit = document.getElementById("submit"),
    $response = document.getElementById("response"),
    $url = document.getElementById('url'),
    n = 0,
    m = 0;

  /*
       * tests to see if a string is json
       * @param {String} str string to test
       * @return {Boolean}
       */
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  // function to submit Request
  submitRequest = function () {
    var httpRequest = new XMLHttpRequest(),
      parsedData,
      fromDate = 1420138273876 + n,
      proxyURL =
        "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy-v2.php",
      options = {};
    options.requestType = 'GET';
    options.url = 'https://analytics.api.brightcove.com/v1/data?accounts=1752604059001&dimensions=video&limit=' + m + '&from=' + fromDate.toString();
    url.textContent = options.url;
    getResponse = function () {
      try {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status >= 200 && httpRequest.status < 300) {
            console.log("response", httpRequest.responseText);
            if (isJson(httpRequest.responseText)) {
              parsedData = JSON.parse(httpRequest.responseText);
              $response.textContent = JSON.stringify(parsedData, null, "  ");
              if (n < 10000000000) {
                n = n + 1000000;
                m++;
                submitRequest();
              }
            } else {
              $response.textContent = httpRequest.responseText;
            }
          } else {
            alert(
              "There was a problem with the request. Request returned " +
              httpRequest.status
            );
          }
        }
      } catch (e) {
        alert("Caught Exception: " + e);
      }
    };
    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    httpRequest.open("POST", proxyURL);
    // open and send request
    httpRequest.send(JSON.stringify(options));
  };
  $submit.addEventListener("click", submitRequest);
})(window, document);
