var BCLS = (function(window, document) {
  var account_id,
    // api stuff
    proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy-v2.php',
    baseURL = 'https://cms.api.brightcove.com/v1/accounts/',
    limit = 25,
    totalVideos = 0,
    totalCalls = 0,
    callNumber = 0,
    videosArray = [],
    videosForReport = [],
    summaryData = {},
    csvStr,
    // elements
    makeReport = document.getElementById('makeReport'),
    data_table_body = document.getElementById('data_table_body'),
    csvData = document.getElementById('csvData'),
    apiRequest = document.getElementById('apiRequest'),
    log_message = document.getElementById('log_message');

  /**
   * tests for all the ways a variable might be undefined or not have a value
   * @param {String|Number} x the variable to test
   * @return {Boolean} true if variable is defined and has a value
   */
  function isDefined(x) {
    if (x === '' || x === null || x === undefined) {
      return false;
    }
    return true;
  }

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

  /**
 * utility to extract h/m/s from seconds
 * @param {number} ms - milliseconds to convert to hh:mm:ss
 * @returns {object} object with members h (hours), m (minutes), s (seconds)
 */
    function secondsToTime(ms) {
        var secs = ms / 1000,
            hours = Math.floor(secs / (60 * 60)),
            divisor_for_minutes = secs % (60 * 60),
            minutes = Math.floor(divisor_for_minutes / 60),
            divisor_for_seconds = divisor_for_minutes % 60,
            seconds = Math.ceil(divisor_for_seconds),
            obj = {};

        if (hours < 10) {
            hours = "0" + hours.toString();
        } else {
            hours = hours.toString();
        }

        if (minutes < 10) {
            minutes = "0" + minutes.toString();
        } else {
            minutes = minutes.toString();
        }

        if (seconds < 10) {
            seconds = "0" + seconds.toString();
        } else {
            seconds = seconds.toString();
        }

        obj = {
            'h': hours,
            'm': minutes,
            's': seconds
        };

        return obj;
    }




  /**
   * find index of an object in array of objects
   * based on some property value
   *
   * @param {array} targetArray array to search
   * @param {string} objProperty object property to search
   * @param {string} value of the property to search for
   * @return {integer} index of first instance if found, otherwise returns -1
  */
  function findObjectInArray(targetArray, objProperty, value) {
      var i, totalItems = targetArray.length, objFound = false;
      for (i = 0; i < totalItems; i++) {
          if (targetArray[i][objProperty] === value) {
              objFound = true;
              return i;
          }
      }
      if (objFound === false) {
          return -1;
      }
  }
  function startCSVStrings() {
    var i = 0,
      iMax;
    csvStr = '"Video ID","Name","Duration","EN Subtitles",\r\n';
  }

  function processVideos() {
    var video,
      obj,
      idx,
      i,
      durationFormatted,
      iMax;
    iMax = videosArray.length;
    for (i = 0; i < iMax; i++) {
      obj = {};
      video = videosArray[i];
      obj.id = video.id;
      obj.name = video.name;
      durationFormatted = secondsToTime(video.duration);
      obj.duration = durationFormatted.m + ':' + durationFormatted.s;
      if (video.text_tracks.length > 0) {
        idx = findObjectInArray(video.text_tracks, 'srclang', 'en');
        obj.captions_url = video.text_tracks[idx].src;
      } else {
        obj.captions_url = 'None';
      }
      videosForReport.push(obj);
    }
    return;
  }

  function writeReport() {
    var i,
      iMax,
      j,
      jMax,
      video,
      tr,
      td,
      frag = document.createDocumentFragment();
    if (videosForReport.length > 0) {
      iMax = videosForReport.length;
      for (i = 0; i < iMax; i += 1) {
        video = videosForReport[i];
        // replace any line breaks in description, as that will break the CSV
        if (video.description) {
          video.description = video.description.replace(/(?:\r\n|\r|\n)/g, ' ');
        }
        // add csv row
        csvStr += '"' + video.id + '","' + video.name + '","' + video.duration + '","' + video.captions_url + '",\r\n';
      csvData.textContent += csvStr;
      // add table row
      tr = document.createElement('tr');
      td = document.createElement('td');
      td.textContent = video.id;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = video.name;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = video.duration;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = video.captions_url;
      tr.appendChild(td);
      frag.appendChild(tr);
    }
    csvData.textContent = csvStr;
    data_table_body.appendChild(frag);
    log_message.textContent = 'Finished! See the reports below.'
  }
}

  /**
   * sets up the data for the API request
   * @param {String} id the id of the button that was clicked
   */
  function createRequest(id) {
    var endPoint = '',
      parsedData,
      options = {};
      options.proxyURL = proxyURL;
      options.account_id = account_id;
    switch (id) {
      case 'getCount':
        endPoint = account_id + '/counts/videos?sort=created_at&q=state:ACTIVE';
        options.url = baseURL + endPoint;
        options.requestType = 'GET';
        apiRequest.textContent = options.url;
        makeRequest(options, function(response) {
          parsedData = JSON.parse(response);
          // set total videos
          video_count = parsedData.count;
          totalVideos = video_count;
          totalCalls = Math.ceil(totalVideos / limit);
          createRequest('getVideos');
        });
        break;
      case 'getVideos':
        var offset = (limit * callNumber);
        endPoint = account_id + '/videos?sort=created_at&q=state:ACTIVE&limit=' + limit + '&offset=' + offset;
        options.url = baseURL + endPoint;
        options.requestType = 'GET';
        apiRequest.textContent = options.url;
        log_message.textContent += '.';
        makeRequest(options, function(response) {
          parsedData = JSON.parse(response);
          videosArray = videosArray.concat(parsedData);
          callNumber++;
          if (callNumber < totalCalls) {
            createRequest('getVideos');
          } else {
            processVideos();
            writeReport();
          }
        });
        break;
    }
  }

  /**
   * send API request to the proxy
   * @param  {Object} options for the request
   * @param  {String} options.url the full API request URL
   * @param  {String="GET","POST","PATCH","PUT","DELETE"} requestData [options.requestType="GET"] HTTP type for the request
   * @param  {String} options.proxyURL proxyURL to send the request to
   * @param  {JSON} [options.requestBody] Data to be sent in the request body in the form of a JSON string
   * @param  {Function} [callback] callback function that will process the response
   */
  function makeRequest(options, callback) {
      var httpRequest = new XMLHttpRequest(),
          response,
          requestParams,
          dataString,
          proxyURL    = options.proxyURL,
          // response handler
          getResponse = function() {
              try {
                  if (httpRequest.readyState === 4) {
                      if (httpRequest.status >= 200 && httpRequest.status < 300) {
                          response = httpRequest.responseText;
                          // some API requests return '{null}' for empty responses - breaks JSON.parse
                          if (response === '') {
                              response = null;
                          }
                          // return the response
                          callback(response);
                      } else {
                        console.log('request fail');
                      }
                  }
              } catch (e) {
                  console.log('exception');
              }
          };
      /**
       * set up request data
       * the proxy used here takes the following request body:
       * JSON.strinify(options)
       */
      // set response handler
      httpRequest.onreadystatechange = getResponse;
      // open the request
      httpRequest.open('POST', proxyURL);
      // open and send request
      httpRequest.send(JSON.stringify(options));
  }


  function init() {
    // event listeners
    csvData.addEventListener('click', function() {
      this.select();
    });

    // in case of re-run, cleal the results
    csvData.textContent = '';
    while (data_table_body.firstChild) {
        data_table_body.removeChild(data_table_body.firstChild);
    }


    // get the inputs
    account_id = '20318290001'

    // start CSV string
    startCSVStrings();
    // get video count
    createRequest('getCount');
  }


  init();
})(window, document);
