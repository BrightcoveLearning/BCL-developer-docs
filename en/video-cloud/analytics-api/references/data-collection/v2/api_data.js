define({ "api": [  {    "type": "get",    "url": "/tracker",    "title": "Send Event",    "name": "Send_Event",    "group": "Events",    "version": "1.0.0",    "description": "<p>Send event information to the data collector for Brightcove Analytics</p>",    "parameter": {      "fields": {        "URL Parameters: All Requests": [          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": false,            "field": "account",            "description": "<p>account id</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "allowedValues": [              "\"videocloud\""            ],            "optional": false,            "field": "domain",            "description": "<p>always equal to <code>videocloud</code></p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "allowedValues": [              "\"android\"",              "\"bada\"",              "\"ios\"",              "\"linux\"",              "\"mac\"",              "\"tv\"",              "\"os_x\"",              "\"rim\"",              "\"sybian\"",              "\"windows\"",              "\"other\""            ],            "optional": true,            "field": "device_os",            "description": "<p>Override to specify the OS of the device that originated the event in cases where the User Agent is unreliable (ignored unless both device os and device type are included or if the value submitted is not in the list of values shown here. <strong>Not typically included</strong>)</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "device_os_version",            "description": "<p>The version of os being used by the device. When not specified, this will be calculated by parsing the user agent string for the tracking request</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "allowedValues": [              "\"direct\"",              "\"mobile\"",              "\"tablet\"",              "\"tv\"",              "\"desktop\"",              "\"other\""            ],            "optional": true,            "field": "device_type",            "description": "<p>Override to specify the type of the device that originated the event in cases where the User Agent is unreliable (ignored unless both device os and device type are included or if the value submitted is not in the list of values shown here. <strong>Not typically included</strong>)</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "allowedValues": [              "\"player_load\"",              "\"catalog_request\"",              "\"catalog_response\"",              "\"play_request\"",              "\"ad_mode_begin\"",              "\"ad_mode_complete\"",              "\"video_impression\"",              "\"video_view\"",              "\"video_engagement\"",              "\"error\""            ],            "optional": false,            "field": "event",            "description": "<p>the event type</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "destination",            "description": "<p>URI that originated the event</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "source",            "description": "<p>URI that sent the end-user to the <code>destination</code> URI</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "Number",            "optional": true,            "field": "time",            "description": "<p>the timestamp for the event in epoch time (milliseconds)</p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "country",            "description": "<p>ISO-3166 (alpha 2) region cISO-3166 (alpha 2) region code (override in case the system can not detect geographic information from the IP address) <strong>Not typically included</strong></p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "country_name",            "description": "<p>Human readable country name (override in case the system can not detect geographic information from the IP address) <strong>Not typically included</strong></p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "region",            "description": "<p>ISO-3166 (alpha 2) region code (override in case the system can not detect geographic information from the IP address) <strong>Not typically included</strong></p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "region_name",            "description": "<p>Human readable region name (override in case the system can not detect geographic information from the IP address) <strong>Not typically included</strong></p>"          },          {            "group": "URL Parameters: All Requests",            "type": "String",            "optional": true,            "field": "city",            "description": "<p>City name <strong>Not typically included</strong></p>"          }        ],        "URL Parameters: `video_impression` Events": [          {            "group": "URL Parameters: `video_impression` Events",            "type": "String",            "optional": true,            "field": "video",            "description": "<p>the video id</p>"          },          {            "group": "URL Parameters: `video_impression` Events",            "type": "String",            "optional": true,            "field": "video_name",            "description": "<p>the video name</p>"          }        ],        "URL Parameters: `video_view` Events": [          {            "group": "URL Parameters: `video_view` Events",            "type": "String",            "optional": true,            "field": "video",            "description": "<p>the video id</p>"          },          {            "group": "URL Parameters: `video_view` Events",            "type": "String",            "optional": true,            "field": "video_name",            "description": "<p>the video name</p>"          },          {            "group": "URL Parameters: `video_view` Events",            "type": "String",            "optional": true,            "field": "load_time_ms",            "description": "<p>The time, in milliseconds, between initiating data load for the video and the video becoming playable</p>"          },          {            "group": "URL Parameters: `video_view` Events",            "type": "String",            "optional": true,            "field": "start_time_ms",            "description": "<p>The time, in milliseconds, between initiation of playback and the first frame of the video being rendered. This can be different depending on the experience, for instance, if there are no pre-roll ads configured, this measurement is the time between the <code>play_request</code> and <code>video_view</code> events. If there is a preroll ad, the time between <code>ad_mode_begin</code> and <code>ad_mode_complete</code> should not be included</p>"          }        ],        "URL Parameters: `video_engagement` Events": [          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "video",            "description": "<p>the video id</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "video_name",            "description": "<p>the video name</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "range",            "description": "<p>the range of the video video viewed for <code>video_engagement</code> events in the format <code>StartSecond..EndSecond</code> - range can be left out of an engagement event to show that during the period covered by the event, there was no viewing activity. (for example, when there is only re-buffering activity)</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "rendition_url",            "description": "<p>The url to the most recently selected rendition. For example, for an HLS stream this would be the url to the most recently selected variant</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "rendition_indicated_bps",            "description": "<p>The indicated bitrate, in bits per second, of the most recently selected rendition</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "rendition_mime_type",            "description": "<p>The mime type of the most recently selected rendition</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "rendition_height",            "description": "<p>The encoded height of the video rendition in pixels</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "rendition_width",            "description": "<p>The encoded width of the video rendition in pixels</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "rebuffering_seconds",            "description": "<p>The number of seconds the user spent waiting for video to playback due to un-requested delay during the engagement period</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "rebuffering_count",            "description": "<p>The number of times playback stopped due to re-buffering during the represented engagement period delay during the engagement period</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "forward_buffer_seconds",            "description": "<p>The number of seconds of video currently residing in the forward buffer</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "measured_bps",            "description": "<p>The ratio of the number of bits included in the most recently downloaded segment to the time spend downloading that segment, in bits per second</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "player_width",            "description": "<p>The current pixel width of the player at the end of the engagement range</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "player_height",            "description": "<p>The current pixel height of the player at the end of the engagement range</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "String",            "optional": true,            "field": "dropped_frames",            "description": "<p>dropped_frames</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "Number",            "optional": true,            "field": "video_duration",            "description": "<p>the duration of the video in seconds</p>"          },          {            "group": "URL Parameters: `video_engagement` Events",            "type": "Number",            "optional": true,            "field": "video_seconds_viewed",            "description": "<p>count of watched seconds since the last update for <code>video_engagement</code> events</p>"          }        ]      },      "examples": [        {          "title": "player_load event Example:",          "content": " https://analytics.api.brightcove.com/v1/alltime/accounts/20318290001/videos/2660272749001\nhttp://metrics.brightcove.com/tracker\n  ?event=player_load&destination=http%3A-%2F%2Fsupport.brightcove.com%2F\n  &source=http%3A-%2F%2Fwww.google.com\n  %2Furl%3Fsa%3D-t%26rct%3Dj%26q%3D%26esrc%3Ds%26source\n  %3Dweb-%26cd%3D1%26ved%3D0CDYQFjAA%26url\n  %3Dhttp%253A-%252F%252Fsupport.brightcove.com%252F%26ei%3DoEYWUtCgEIXq9ATzn-oCgCQ\n  %26usg%3DAFQjCNEtLodOdxWZSGdJ-pL7WJaEeUJVlnw%26bvm%3Dbv.51156542%2Cd.dmg\n  &domain=videocloud&account=1749339200&time=1377191644796",          "type": "Url"        }      ]    },    "success": {      "examples": [        {          "title": "Success Response:",          "content": "HTTP/1.1 200 OK",          "type": "image/png"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "json",            "optional": false,            "field": "RESOURCE_NOT_FOUND",            "description": "<p>404: The api couldn't find the resource you requested</p>"          },          {            "group": "Error 4xx",            "type": "json",            "optional": false,            "field": "BAD_REQUEST",            "description": "<p>400: The message fields of the response contains information about what caused the error such as <code>invalid value for sort parameter</code></p>"          },          {            "group": "Error 4xx",            "type": "json",            "optional": false,            "field": "UNSUPPORTED_FIELD_COMBINATION_ERROR",            "description": "<p>400: The message fields of the response contains information about what invalid fields were specifed</p>"          },          {            "group": "Error 4xx",            "type": "json",            "optional": false,            "field": "METHOD_NOT_ALLOWED",            "description": "<p>405: This error occurs when the api request is made with an HTTP method other than GET</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "type": "json",            "optional": false,            "field": "SERVER_ERROR",            "description": "<p>500: Issue in Brightcove system; try again later</p>"          }        ]      },      "examples": [        {          "title": "404 Error Response",          "content": " HTTP/1.1 404 Not Found\n[\n    {\n        \"error_code\": \"NOT_FOUND\",\n        \"message\": \"Requested resource does not exist\",\n        \"request_id\": \"df35af83-ac9b-44b0-b172-a80a11bd0bfa\"\n    }\n]",          "type": "json"        }      ]    },    "filename": "v2/src/tracker.js",    "groupTitle": "Events"  }] });
