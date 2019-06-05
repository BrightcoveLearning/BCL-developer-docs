/**
 * @apiDefine videoGroup Video
 * The video operations allow you to retrieve video objects from your Video Cloud library.
 */

 // get videos

 /**
  * @api {get} /accounts/:account_id/videos Get Videos
  * @apiName Get Videos
  * @apiGroup videoGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Gets a page of video objects. The Playback API allows you to programmatically [search for videos](https://support.brightcove.com/node/18005) in your Video Cloud library. To use the search functionality, you must include a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos).
  <br><br>
  __<span id="searchpolicy">Notes:</span>__
  - When performing a search, you need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos). For information on getting policy keys, see the [Policy API Overview](https://support.brightcove.com/node/18003) or the [Policy Keys](https://support.brightcove.com/node/18125) documents.

  - In general, search-enabled Policy Keys should only be stored on a server and not in a browser player or mobile app, since they can be used to list all playable videos. For some accounts this may not be applicable if you do not care if all of your playable videos can be discovered.

  - The maximum number of videos (highest `count` value) returned is 1000, even if there are more matching videos in the account. The `count` value is an estimate and should not be relied on as the exact number to be returned. If all results are desired then keep paging until it no longer returns a full page, or use the CMS api.

  - Only currently playable videos are included in the results list. It is recommended to do a similar query with the CMS api to see why some videos are excluded.

  - Any geo-restricted videos that are denied for the particular requestor are omitted from the results. As long as some videos are allowed the request is considered successful. An errors field is added to the result with a summary explaining why videos were omitted.
  <br><br>
  *
  * @apiHeader {String} Accept: application/json;pk=policy_key (there are 3 ways to authenticate &mdash; use one of these three headers). You need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos).
  * @apiHeader {String} Authorization: BCOV-Policy {policy_key} (there are 3 ways to authenticate &mdash; use one of these three headers). You need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos).
  * @apiHeader {String} BCOV-Policy: {policy_key} (there are 3 ways to authenticate &mdash; use one of these three headers). You need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos).
  *
  * @apiParam {String} account_id Video Cloud account ID
  *
  * @apiParam (URL Parameters) {Number} [limit=20] number of videos to return
  * @apiParam (URL Parameters) {Number} [offset=0] number of videos to skip in the response
  * @apiParam (URL Parameters) {String} [q] search string - see [search guide](https://support.brightcove.com/node/18005) for details
  * @apiParam (URL Parameters) {String="name", "reference_id", "created_at", "published_at", "updated_at", "schedule_starts_at", "schedule_ends_at", "state", "plays_total", "plays_trailing_week"} [sort="-updated_at"] field to sort results by; if absent and there is a search string, results are sorted by relevance &mdash; note that `plays_total` and `plays_trailing_week` are **not** included in the response - note: to sort in descending order, preface the sort field name with a minus (-) sign
  * @apiParam (URL Parameters) {String} [ad_config_id] include [server-side ad insertion](https://support.brightcove.com/node/17906#Video_request_with_SSAI)
  *
  * @apiParamExample {String} Search Example:
  *     https://edge.api.brightcove.com/playback/v1/accounts/:account_id/videos?q=tags:nature,name:nature
  *
  * @apiSuccess (200) {String} account_id Video Cloud account id
  * @apiSuccess (200) {String} id video id
  * @apiSuccess (200) {String} name video title
  * @apiSuccess (200) {String} created_at when the video was created
  * @apiSuccess (200) {Object} custom_fields={} map of fieldname-value pairs
  * @apiSuccess (200) {Object} cue_points array of cue point maps
  * @apiSuccess (200) {String} cue_points.name cue point name
  * @apiSuccess (200) {String} cue_points.type=AD cue point type
  * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
  * @apiSuccess (200) {String} cue_points.metadata=null optional metadata string (128 single-byte characters maximum)
  * @apiSuccess (200) {Boolean} cue_points.force-stop=false whether video is force-stopped at the cue point
  * @apiSuccess (200) {String} description video short description
  * @apiSuccess (200) {Number} duration video duration in milliseconds
  * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
  * @apiSuccess (200) {Object[]} poster_sources array of poster source maps (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
  * @apiSuccess (200) {String} poster_sources.src URL for a poster source image (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
  * @apiSuccess (200) {String} poster URL for the default poster source image
  * @apiSuccess (200) {String} projection The mapping projection for 360° videos, e.g. "equirectangular"
  * @apiSuccess (200) {Object[]} thumbnail_sources array of thumbnail source maps (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
  * @apiSuccess (200) {String} thumbnail_sources.src URL for a thumbnail source image (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
  image
  * @apiSuccess (200) {String} thumbnail URL for the default thumbnail source image
  * @apiSuccess (200) {Object} link map of scheduling properties
  * @apiSuccess (200) {String} link.text text for the link
  * @apiSuccess (200) {String} link.url URL for the link
  * @apiSuccess (200) {String} long_description video long description
  * @apiSuccess (200) {Boolean} offline_enabled whether video is enabled for offline viewing
  * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
  * @apiSuccess (200) {String[]} tags array of tags
  * @apiSuccess (200) {Object[]} sources array of video sources (renditions)
  * @apiSuccess (200) {Number} sources.avg_bitrate average bitrate
  * @apiSuccess (200) {Number} sources.width frame width in pixels
  * @apiSuccess (200) {Number} sources.height frame height in pixels
  * @apiSuccess (200) {Number} sources.size size in bytes
  * @apiSuccess (200) {Number} sources.duration duration in milliseconds
  * @apiSuccess (200) {String} sources.asset_id the asset id for the source
  * @apiSuccess (200) {String} sources.stream_name the stream name for the source
  * @apiSuccess (200) {String} sources.codec the video codec
  * @apiSuccess (200) {String} sources.container the video container
  * @apiSuccess (200) {String} sources.app_name the address for rtmp streams
  * @apiSuccess (200) {String} sources.type the type (for HLS streams)
  * @apiSuccess (200) {Object} sources.key_systems a list of objects where each defines the type of encryption used for a DRM packaged source – if this object is defined, then its source is content protected
  * @apiSuccess (200) {Object} text_tracks array of text track maps
  * @apiSuccess (200) {String} text_tracks.src URL for the .vtt file
  * @apiSuccess (200) {Object[]} text_tracks.sources array of sources for .vtt files (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
  * @apiSuccess (200) {String} text_tracks.sources.src URL for the .vtt file (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
  * @apiSuccess (200) {String} text_tracks.kind kind of text track
  * @apiSuccess (200) {String} text_tracks.srclang 2-letter language code, such as "en" or "ko"
  * @apiSuccess (200) {String} text_tracks.mime_type mime_type for the track
  * @apiSuccess (200) {String} text_tracks.label label for the track
  * @apiSuccess (200) {Boolean} text_tracks.default whether this is the default track
  * @apiSuccess (200) {String} text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
  * @apiSuccess (200) {String} updated_at when the video was last modified
  * @apiSuccess (200) {Object} ad_keys=null map of key/value pairs for ad requests
  * @apiSuccess (200) {Number} count the count of videos found
  *
  * @apiSuccessExample {json} Success Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "count": 123,
  *       "videos":
  *         [
  *           {<video1 fields>},
  *           {<video2 fields>},
  *           ...
  *         ]
  *     }
  *
  * @apiError (Error 400) {json} BAD_REQUEST error_subcode:

  `DUPLICATE_PARAMETERS` - The same parameter name was provided more than once in the request

  `INVALID_SEARCH` - The search parameters are not valid

  `ILLEGAL_QUERY` - The search string syntax was invalid - example: 1) doing a tags search that ends with a comma or has an unclosed quote

  `INVALID_SORT` - The sort parameters specified an invalid field
  * @apiError (Error 401) {json} INVALID_POLICY_KEY Must be a legal policy key in an [appropriate header](https://support.brightcove.com/node/17906).
  * @apiError (Error 403) {json} ACCESS_DENIED error_subcode:

  `ACCOUNT_ID`  - The account id in the policy key does not match the account in the api request

  `API`  - The policy key is not search-enabled when attempting to perform a search

  `CLIENT_GEO` - The video is restricted from playing in the current geo region; the message will contain additional information about the specific issue. For more details, see the [Playback API Error Reference](https://support.brightcove.com/node/17903)

  `CLIENT_IP` - The video is restricted at the current IP address

  `DOMAIN` - The video is restricted from playing on the current domain

  `POLICY_ERROR` - Error when evaluating the policy key


  * @apiError (Error 403) {json} FORBIDDEN error_subcode:
  `VIDEO_NOT_PLAYABLE` - For a single video request, the video exists, but is not allowed to be played now. That could be any of the four reasons that videos are not playable: not sufficiently ingested, has no sources, not active, not in scheduled date range.
  * @apiError (Error 404) {json} NOT_FOUND error_subcode:

  `VIDEO_NOT_FOUND` - The requested resource is not available.
  * @apiError (Error 405) {json} METHOD_NOT_ALLOWED Only `GET`, `HEAD` and `OPTIONS` are allowed for this api.
  * @apiError (Error 500) {json} SERVER_ERROR Internal server error.
  * @apiError (Error 502) {json} SERVER_ERROR Got a bad response from a backend server.

  Various `*_RETRIEVE_FAILURE` error codes: `ACCOUNT_RETRIEVE_FAILURE`, `VIDEO_RETRIEVE_FAILURE`, `VIDEO_URLS_RETRIEVE_FAILURE`.
  * @apiError (Error 503) {json} SERVICE_UNAVAILABLE Returned this response from a backend server.
  * @apiError (Error 504) {json} SERVER_TIMEOUT Either a backend server or one of the servers they rely on timed out.
  *
  */

  // get related videos

  /**
   * @api {get} /accounts/:account_id/videos/:video_id/related Get Related Videos by ID or Reference ID
   * @apiName Get Related Videos by ID or Reference ID
   * @apiGroup videoGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Gets a page of video objects that are related to the specified video. Using the `name` and `short description` of the specified video, the Playback API searches for videos with any partial matches in the following fields: `name`, `short description`, `long description`, `tags`.
   <br><br>
   __<span id="searchpolicy">Notes:</span>__
   - When performing this search, you need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos). For information on getting policy keys, see the [Policy API Overview](https://support.brightcove.com/node/18003) or the [Policy Keys](https://support.brightcove.com/node/18125) documents.

   - In general, search-enabled Policy Keys should only be stored on a server and not in a browser player or mobile app, since they can be used to list all playable videos. For some accounts this may not be applicable if you do not care if all of your playable videos can be discovered.

   - The response results for this endpoint are subject to change as we improve the algorithm for finding related videos. If you do not want your results to change, or if you want precise control, then you should use the Get Videos endpoint with a [search parameter](https://support.brightcove.com/node/18005).

   - Any geo-restricted videos that are denied for the particular requestor are omitted from the results. As long as some videos are allowed the request is considered successful. An errors field is added to the result with a summary explaining why videos were omitted.
   <br><br>
   *
   * @apiHeader {String} Accept: application/json;pk=policy_key (there are 3 ways to authenticate &mdash; use one of these three headers). You need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos).
   * @apiHeader {String} Authorization: BCOV-Policy {policy_key} (there are 3 ways to authenticate &mdash; use one of these three headers). You need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos).
   * @apiHeader {String} BCOV-Policy: {policy_key} (there are 3 ways to authenticate &mdash; use one of these three headers). You need to use a [search-enabled Policy Key](https://support.brightcove.com/node/18003#Search_videos).
   *
   * @apiParam {String} account_id Video Cloud account ID
   * @apiParam {Number} video_id Video Cloud video ID
   *
   * @apiParam (URL Parameters) {Number} [limit=20] number of videos to return
   * @apiParam (URL Parameters) {String} [ad_config_id] include [server-side ad insertion](https://support.brightcove.com/node/17906#Video_request_with_SSAI)
   *
   * @apiParamExample {String} Get Related Videos Example:
   *     https://edge.api.brightcove.com/playback/v1/accounts/57838016001/videos/38467382999/related
   *     // or
   *     https://edge.api.brightcove.com/playback/v1/accounts/57838016001/videos/ref:nature1/related
   *
   * @apiSuccess (200) {String} account_id Video Cloud account id
   * @apiSuccess (200) {String} id video id
   * @apiSuccess (200) {String} name video title
   * @apiSuccess (200) {String} created_at when the video was created
   * @apiSuccess (200) {Object} custom_fields={} map of fieldname-value pairs
   * @apiSuccess (200) {Object} cue_points array of cue point maps
   * @apiSuccess (200) {String} cue_points.name cue point name
   * @apiSuccess (200) {String} cue_points.type=AD cue point type
   * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
   * @apiSuccess (200) {String} cue_points.metadata=null optional metadata string (128 single-byte characters maximum)
   * @apiSuccess (200) {Boolean} cue_points.force-stop=false whether video is force-stopped at the cue point
   * @apiSuccess (200) {String} description video short description
   * @apiSuccess (200) {Number} duration video duration in milliseconds
   * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
   * @apiSuccess (200) {Object[]} poster_sources array of poster source maps (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
   * @apiSuccess (200) {String} poster_sources.src URL for a poster source image (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
   * @apiSuccess (200) {String} poster URL for the default poster source image
   * @apiSuccess (200) {String} projection The mapping projection for 360° videos, e.g. "equirectangular"
   * @apiSuccess (200) {Object[]} thumbnail_sources array of thumbnail source maps (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
   * @apiSuccess (200) {String} thumbnail_sources.src URL for a thumbnail source image (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
   image
   * @apiSuccess (200) {String} thumbnail URL for the default thumbnail source image
   * @apiSuccess (200) {Object} link map of scheduling properties
   * @apiSuccess (200) {String} link.text text for the link
   * @apiSuccess (200) {String} link.url URL for the link
   * @apiSuccess (200) {String} long_description video long description
   * @apiSuccess (200) {Boolean} offline_enabled whether video is enabled for offline viewing
   * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
   * @apiSuccess (200) {String[]} tags array of tags
   * @apiSuccess (200) {Object[]} sources array of video sources (renditions)
   * @apiSuccess (200) {Number} sources.avg_bitrate average bitrate
   * @apiSuccess (200) {Number} sources.width frame width in pixels
   * @apiSuccess (200) {Number} sources.height frame height in pixels
   * @apiSuccess (200) {Number} sources.size size in bytes
   * @apiSuccess (200) {Number} sources.duration duration in milliseconds
   * @apiSuccess (200) {String} sources.asset_id the asset id for the source
   * @apiSuccess (200) {String} sources.stream_name the stream name for the source
   * @apiSuccess (200) {String} sources.codec the video codec
   * @apiSuccess (200) {String} sources.container the video container
   * @apiSuccess (200) {String} sources.app_name the address for rtmp streams
   * @apiSuccess (200) {String} sources.type the type (for HLS streams)
   * @apiSuccess (200) {Object} sources.key_systems a list of objects where each defines the type of encryption used for a DRM packaged source – if this object is defined, then its source is content protected
   * @apiSuccess (200) {Object} text_tracks array of text track maps
   * @apiSuccess (200) {String} text_tracks.src URL for the .vtt file
   * @apiSuccess (200) {Object[]} text_tracks.sources array of sources for .vtt files (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
   * @apiSuccess (200) {String} text_tracks.sources.src URL for the .vtt file (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
   * @apiSuccess (200) {String} text_tracks.kind kind of text track
   * @apiSuccess (200) {String} text_tracks.srclang 2-letter language code, such as "en" or "ko"
   * @apiSuccess (200) {String} text_tracks.mime_type mime_type for the track
   * @apiSuccess (200) {String} text_tracks.label label for the track
   * @apiSuccess (200) {Boolean} text_tracks.default whether this is the default track
   * @apiSuccess (200) {String} text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
   * @apiSuccess (200) {String} updated_at when the video was last modified
   * @apiSuccess (200) {Object} ad_keys=null map of key/value pairs for ad requests
   *
   * @apiSuccessExample {json} Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "videos":
   *         [
   *           {<video1 fields>},
   *           {<video2 fields>},
   *           ...
   *         ]
   *     }
   *
   * @apiError (Error 400) {json} BAD_REQUEST error_subcode:

   `DUPLICATE_PARAMETERS` - The same parameter name was provided more than once in the request

   `INVALID_SEARCH` - The search parameters are not valid

   `ILLEGAL_QUERY` - The search string syntax was invalid - example: 1) doing a tags search that ends with a comma or has an unclosed quote

   `INVALID_SORT` - The sort parameters specified an invalid field
   * @apiError (Error 401) {json} INVALID_POLICY_KEY Must be a legal policy key in an [appropriate header](https://support.brightcove.com/node/17906).
   * @apiError (Error 403) {json} ACCESS_DENIED error_subcode:

   `ACCOUNT_ID`  - The account id in the policy key does not match the account in the api request

   `API`  - The policy key is not search-enabled when attempting to perform a search

   `CLIENT_GEO` - The video is restricted from playing in the current geo region; the message will contain additional information about the specific issue. For more details, see the [Playback API Error Reference](https://support.brightcove.com/node/17903)

   `CLIENT_IP` - The video is restricted at the current IP address

   `DOMAIN` - The video is restricted from playing on the current domain

   `POLICY_ERROR` - Error when evaluating the policy key


   * @apiError (Error 403) {json} FORBIDDEN error_subcode:
   `VIDEO_NOT_PLAYABLE` - For a single video request, the video exists, but is not allowed to be played now. That could be any of the four reasons that videos are not playable: not sufficiently ingested, has no sources, not active, not in scheduled date range.
   * @apiError (Error 404) {json} NOT_FOUND error_subcode:

   `VIDEO_NOT_FOUND` - The requested resource is not available.
   * @apiError (Error 405) {json} METHOD_NOT_ALLOWED Only `GET`, `HEAD` and `OPTIONS` are allowed for this api.
   * @apiError (Error 500) {json} SERVER_ERROR Internal server error.
   * @apiError (Error 502) {json} SERVER_ERROR Got a bad response from a backend server.

   Various `*_RETRIEVE_FAILURE` error codes: `ACCOUNT_RETRIEVE_FAILURE`, `VIDEO_RETRIEVE_FAILURE`, `VIDEO_URLS_RETRIEVE_FAILURE`.
   * @apiError (Error 503) {json} SERVICE_UNAVAILABLE Returned this response from a backend server.
   * @apiError (Error 504) {json} SERVER_TIMEOUT Either a backend server or one of the servers they rely on timed out.
   *
   */

// get video by id

/**
 * @api {get} /accounts/:account_id/videos/:video_id Get Video by ID or Reference ID
 * @apiName Get Video by ID or Reference ID
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a video object based on a video ID or reference ID.
 <br><br>
 *
 * @apiHeader {String} Accept: application/json;pk=policy_key (there are 3 ways to authenticate &mdash; use one of these three headers) See [Policy API Overview](https://support.brightcove.com/node/18003) or [Policy Keys](https://support.brightcove.com/node/18125) for information on getting policy keys
 * @apiHeader {String} Authorization: BCOV-Policy {policy_key} (there are 3 ways to authenticate &mdash; use one of these three headers) See [Policy API Overview](https://support.brightcove.com/node/18003) or [Policy Keys](https://support.brightcove.com/node/18125) for information on getting policy keys
 * @apiHeader {String} BCOV-Policy: {policy_key} (there are 3 ways to authenticate &mdash; use one of these three headers) See [Policy API Overview](https://support.brightcove.com/node/18003) or [Policy Keys](https://support.brightcove.com/node/18125) for information on getting policy keys
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {Number} video_id Video Cloud video ID
 *
 * @apiParam (URL Parameters) {String} [ad_config_id] include [server-side ad insertion](https://support.brightcove.com/node/17906#Video_request_with_SSAI)
 *
 * @apiParamExample {String} Get Video Example:
 *     https://edge.api.brightcove.com/playback/v1/accounts/57838016001/videos/38467382999
 *     // or
 *     https://edge.api.brightcove.com/playback/v1/accounts/57838016001/videos/ref:my_reference_id
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {String} id video id
 * @apiSuccess (200) {String} name video title
 * @apiSuccess (200) {String} created_at when the video was created
 * @apiSuccess (200) {Object} custom_fields={} map of fieldname-value pairs
 * @apiSuccess (200) {Object} cue_points array of cue point maps
 * @apiSuccess (200) {String} cue_points.name cue point name
 * @apiSuccess (200) {String} cue_points.type=AD cue point type
 * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
 * @apiSuccess (200) {String} cue_points.metadata=null optional metadata string (128 single-byte characters maximum)
 * @apiSuccess (200) {Boolean} cue_points.force-stop=false whether video is force-stopped at the cue point
 * @apiSuccess (200) {String} description video short description
 * @apiSuccess (200) {Number} duration video duration in milliseconds
 * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
 * @apiSuccess (200) {Object[]} poster_sources array of poster source maps (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} poster_sources.src URL for a poster source image (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} poster URL for the default poster source image
 * @apiSuccess (200) {String} projection The mapping projection for 360° videos, e.g. "equirectangular"
 * @apiSuccess (200) {Object[]} thumbnail_sources array of thumbnail source maps (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} thumbnail_sources.src URL for a thumbnail source image (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 image
 * @apiSuccess (200) {String} thumbnail URL for the default thumbnail source image
 * @apiSuccess (200) {Object} link map of scheduling properties
 * @apiSuccess (200) {String} link.text text for the link
 * @apiSuccess (200) {String} link.url URL for the link
 * @apiSuccess (200) {String} long_description video long description
 * @apiSuccess (200) {Boolean} offline_enabled whether video is enabled for offline viewing
 * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
 * @apiSuccess (200) {String[]} tags array of tags
 * @apiSuccess (200) {Object[]} sources array of video sources (renditions)
 * @apiSuccess (200) {Number} sources.avg_bitrate average bitrate
 * @apiSuccess (200) {Number} sources.width frame width in pixels
 * @apiSuccess (200) {Number} sources.height frame height in pixels
 * @apiSuccess (200) {Number} sources.size size in bytes
 * @apiSuccess (200) {Number} sources.duration duration in milliseconds
 * @apiSuccess (200) {String} sources.asset_id the asset id for the source
 * @apiSuccess (200) {String} sources.stream_name the stream name for the source
 * @apiSuccess (200) {String} sources.codec the video codec
 * @apiSuccess (200) {String} sources.container the video container
 * @apiSuccess (200) {String} sources.app_name the address for rtmp streams
 * @apiSuccess (200) {String} sources.type the type (for HLS streams)
 * @apiSuccess (200) {Object} sources.key_systems a list of objects where each defines the type of encryption used for a DRM packaged source – if this object is defined, then its source is content protected
 * @apiSuccess (200) {Object} text_tracks array of text track maps
 * @apiSuccess (200) {String} text_tracks.src URL for the .vtt file
 * @apiSuccess (200) {Object[]} text_tracks.sources array of sources for .vtt files (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} text_tracks.sources.src URL for the .vtt file (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} text_tracks.kind kind of text track
 * @apiSuccess (200) {String} text_tracks.srclang 2-letter language code, such as "en" or "ko"
 * @apiSuccess (200) {String} text_tracks.mime_type mime_type for the track
 * @apiSuccess (200) {String} text_tracks.label label for the track
 * @apiSuccess (200) {Boolean} text_tracks.default whether this is the default track
 * @apiSuccess (200) {String} text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {Object} ad_keys=null map of key/value pairs for ad requests
 *
 * @apiSuccessExample {json} Success Response non-DRM:
 *    HTTP/1.1 200 OK
 *    {
 *      "description": "A small friendly bird...",
 *      "poster_sources": [
 *        {
 *          "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480075001_Bird-Chickadee-vs.jpg?pubId=57838016001&videoId=4084164751001"
 *        },
 *        {
 *          "src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/57838016001/201502/1437/57838016001_4084480075001_Bird-Chickadee-vs.jpg?pubId=57838016001&videoId=4084164751001"
 *        }
 *      ],
 *      "tags": [
 *        "air",
 *        "bird",
 *        "nature"
 *      ],
 *      "cue_points": [],
 *      "custom_fields": {},
 *      "economics": "AD_SUPPORTED",
 *      "account_id": "57838016001",
 *      "sources": [
 *        {
 *          "avg_bitrate": 1108347,
 *          "width": 640,
 *          "duration": 8240,
 *          "size": 1141597,
 *          "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480003001_Bird-Chickadee.mp4&1445382000000&5183d52cee025d9f8d0bd3730ac158ae",
 *          "codec": "H264",
 *          "asset_id": "4084480003001",
 *          "container": "MP4",
 *          "height": 344,
 *          "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *        },
 *        {
 *          "avg_bitrate": 1108347,
 *          "width": 640,
 *          "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480003001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *          "size": 1141597,
 *          "height": 344,
 *          "duration": 8240,
 *          "container": "MP4",
 *          "codec": "H264",
 *          "asset_id": "4084480003001"
 *        },
 *        {
 *          "avg_bitrate": 502409,
 *          "width": 400,
 *          "duration": 8240,
 *          "size": 517481,
 *          "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480008001_Bird-Chickadee.mp4&1445382000000&5183d52cee025d9f8d0bd3730ac158ae",
 *          "codec": "H264",
 *          "asset_id": "4084480008001",
 *          "container": "MP4",
 *          "height": 214,
 *          "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *        },
 *        {
 *          "avg_bitrate": 502409,
 *          "width": 400,
 *          "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480008001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *          "size": 517481,
 *          "height": 214,
 *          "duration": 8240,
 *          "container": "MP4",
 *          "codec": "H264",
 *          "asset_id": "4084480008001"
 *        },
 *        {
 *          "avg_bitrate": 297015,
 *          "width": 320,
 *          "duration": 8240,
 *          "size": 305925,
 *          "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480009001_Bird-Chickadee.mp4&1445382000000&5183d52cee025d9f8d0bd3730ac158ae",
 *          "codec": "H264",
 *          "asset_id": "4084480009001",
 *          "container": "MP4",
 *          "height": 172,
 *          "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *        },
 *        {
 *          "avg_bitrate": 297015,
 *          "width": 320,
 *          "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480009001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *          "size": 305925,
 *          "height": 172,
 *          "duration": 8240,
 *          "container": "MP4",
 *          "codec": "H264",
 *          "asset_id": "4084480009001"
 *        },
 *        {
 *          "avg_bitrate": 1685090,
 *          "width": 640,
 *          "duration": 8240,
 *          "size": 1735643,
 *          "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480012001_Bird-Chickadee.mp4&1445382000000&5183d52cee025d9f8d0bd3730ac158ae",
 *          "codec": "H264",
 *          "asset_id": "4084480012001",
 *          "container": "MP4",
 *          "height": 344,
 *          "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *        },
 *        {
 *          "avg_bitrate": 1685090,
 *          "width": 640,
 *          "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480012001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *          "size": 1735643,
 *          "height": 344,
 *          "duration": 8240,
 *          "container": "MP4",
 *          "codec": "H264",
 *          "asset_id": "4084480012001"
 *        },
 *        {
 *          "avg_bitrate": 3949531,
 *          "width": 640,
 *          "duration": 8240,
 *          "size": 4068017,
 *          "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480014001_Bird-Chickadee.mp4&1445382000000&5183d52cee025d9f8d0bd3730ac158ae",
 *          "codec": "H264",
 *          "asset_id": "4084480014001",
 *          "container": "MP4",
 *          "height": 344,
 *          "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *        },
 *        {
 *          "avg_bitrate": 3949531,
 *          "width": 640,
 *          "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480014001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *          "size": 4068017,
 *          "height": 344,
 *          "duration": 8240,
 *          "container": "MP4",
 *          "codec": "H264",
 *          "asset_id": "4084480014001"
 *        },
 *        {
 *          "avg_bitrate": 704771,
 *          "width": 480,
 *          "duration": 8240,
 *          "size": 725914,
 *          "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480079001_Bird-Chickadee.mp4&1445382000000&5183d52cee025d9f8d0bd3730ac158ae",
 *          "codec": "H264",
 *          "asset_id": "4084480079001",
 *          "container": "MP4",
 *          "height": 258,
 *          "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *        },
 *        {
 *          "avg_bitrate": 704771,
 *          "width": 480,
 *          "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480079001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *          "size": 725914,
 *          "height": 258,
 *          "duration": 8240,
 *          "container": "MP4",
 *          "codec": "H264",
 *          "asset_id": "4084480079001"
 *        },
 *        {
 *          "avg_bitrate": 2446959,
 *          "width": 640,
 *          "duration": 8240,
 *          "size": 2520368,
 *          "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480703001_Bird-Chickadee.mp4&1445382000000&5183d52cee025d9f8d0bd3730ac158ae",
 *          "codec": "H264",
 *          "asset_id": "4084480703001",
 *          "container": "MP4",
 *          "height": 344,
 *          "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *        },
 *        {
 *          "avg_bitrate": 2446959,
 *          "width": 640,
 *          "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480703001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *          "size": 2520368,
 *          "height": 344,
 *          "duration": 8240,
 *          "container": "MP4",
 *          "codec": "H264",
 *          "asset_id": "4084480703001"
 *        },
 *        {
 *          "type": "application/x-mpegURL",
 *          "src": "http://c.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=4084164751001&pubId=57838016001",
 *          "container": "M2TS",
 *          "codec": "H264"
 *        },
 *        {
 *          "type": "application/x-mpegURL",
 *          "src": "https://secure.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=4084164751001&pubId=57838016001&secure=true",
 *          "container": "M2TS",
 *          "codec": "H264"
 *        }
 *      ],
 *      "name": "Chickadee",
 *      "reference_id": "Bird_Chickadee.mp4_1425064251252",
 *      "long_description": null,
 *      "duration": 8240,
 *      "published_at": "2015-02-27T19:10:55.425Z",
 *      "text_tracks": [],
 *      "updated_at": "2015-02-27T19:11:57.808Z",
 *      "thumbnail": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480007001_Bird-Chickadee-th.jpg?pubId=57838016001&videoId=4084164751001",
 *      "poster": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480075001_Bird-Chickadee-vs.jpg?pubId=57838016001&videoId=4084164751001",
 *      "link": null,
 *      "id": "4084164751001",
 *      "ad_keys": null,
 *      "thumbnail_sources": [
 *        {
 *          "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480007001_Bird-Chickadee-th.jpg?pubId=57838016001&videoId=4084164751001"
 *        },
 *        {
 *          "src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/57838016001/201502/1437/57838016001_4084480007001_Bird-Chickadee-th.jpg?pubId=57838016001&videoId=4084164751001"
 *        }
 *      ],
 *      "created_at": "2015-02-27T19:10:55.425Z"
 *    }
 *
 ** @apiSuccessExample {json} Success Response DRM:
 *    HTTP/1.1 200 OK
 *    {
 *"description": null,
 *"poster_sources": [
*   {
*     "src": "http://brightcove.vo.llnwd.net/e1/pd/3742124111001/3742124111001_5435275111001_5435211119001-vs.jpg?pubId=3742111155001&videoId=5435211119001"
*   },
*   {
*     "src": "https://brightcove.hs.llnwd.net/e1/pd/3742124111001/3742124111001_5435275111001_5435275111001-vs.jpg?pubId=3742124111001&videoId=5435211119001"
*   }
* ],
* "tags": [],
* "cue_points": [],
* "custom_fields": {},
* "account_id": "3742124111001",
* "sources": [
*   {
*     "type": "application/vnd.apple.mpegurl",
*     "src": "http://hlsak-a.akamaihd.net/3742124111001/3742124111001_5435271111001_5435211119001.m3u8?pubId=3742124111001&videoId=5435271119001",
*     "key_systems": {
*       "com.apple.fps.1_0": {
*         "key_request_url": "https://yourfpskeyrequesturl"
*       }
*     },
*     "asset_id": "5435211161001"
*   },
*   {
*     "type": "application/vnd.apple.mpegurl",
*     "src": "https://hlsak-a.akamaihd.net/3742124111001/3742124955001_5435271111001_5435271119001.m3u8?pubId=3742124111001&videoId=5435211119001",
*     "key_systems": {
*       "com.apple.fps.1_0": {
*         "key_request_url": "https://yourfpskeyrequesturl"
*       }
*     },
*     "asset_id": "5435275961001"
*   },
*   {
*     "type": "application/dash+xml",
*     "src": "http://hlsak-a.akamaihd.net/3742124111001/3742124111001_5435271113001_5435211119001.mpd?pubId=3742124111001&videoId=5435211119001",
*     "profiles": "urn:mpeg:dash:profile:isoff-live:2011",
*     "key_systems": {
*       "com.widevine.alpha": {
*         "license_url": "https://yourwidevinelicenseurl"
*       },
*       "com.microsoft.playready": {
*         "license_url": "https://yourplayreadylicenseurl"
*       }
*     },
*     "asset_id": "5435275111001"
*   },
*   {
*     "type": "application/dash+xml",
*     "src": "https://hlsak-a.akamaihd.net/3742124111001/3742124111001_5435275111001_5435211119001.mpd?pubId=3742124111001&videoId=5435211119001",
*     "profiles": "urn:mpeg:dash:profile:isoff-live:2011",
*     "key_systems": {
*       "com.widevine.alpha": {
*         "license_url": "https://yourwidevinelicenseurl"
*       },
*       "com.microsoft.playready": {
*         "license_url": "https://yourplayreadylicenseurl"
*       }
*     },
*     "asset_id": "5435211153001"
*   }
* ],
* "name": "Brown_Pelican -FP, WV, and multiple captions",
* "reference_id": null,
* "long_description": null,
* "duration": 14333,
* "economics": "AD_SUPPORTED",
* "published_at": "2017-05-15T22:33:18.529Z",
* "text_tracks": [
*   {
*     "mime_type": "text/vtt",
*     "account_id": "3742124111001",
*     "default": false,
*     "sources": [
*       {
*         "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/3742124111001/201705/1640/3742124111001_cb636d32-eb07-491a-b741-2a9111e9e611.vtt?pubId=3742124111001&videoId=5435211119001"
*       },
*       {
*         "src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/3742124111001/201705/1640/3742124111001_cb636d32-eb07-491a-b741-2a9111e9e611.vtt?pubId=3742124111001&videoId=5435211119001"
*       }
*     ],
*     "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/3742124111001/201705/1640/3742124111001_cb636d32-eb07-491a-b741-2a9111e9e611.vtt?pubId=3742124111001&videoId=5435211119001",
*     "asset_id": "cb636d32-eb07-491a-b741-2a9111e9e611",
*     "label": "ES",
*     "id": "585bdfc2-74c0-4c1b-a2d6-d5e5d111a4ed",
*     "kind": "captions",
*     "srclang": "es"
*   },
*   {
*     "mime_type": "text/vtt",
*     "account_id": "3742124111001",
*     "default": true,
*     "sources": [
*       {
*         "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/3742124111001/201705/1640/3742124111001_dadfa799-f10f-4af9-ad77-1211136c2a91.vtt?pubId=3742124111001&videoId=5435211119001"
*       },
*       {
*         "src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/3742124111001/201705/1640/3742124111001_dadfa799-f10f-4af9-ad77-1211136c2a91.vtt?pubId=3742124111001&videoId=5435211119001"
*       }
*     ],
*     "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/3742124111001/201705/1640/3742124111001_dadfa799-f10f-4af9-ad77-1211136c2a91.vtt?pubId=3742124111001&videoId=5435211119001",
*     "asset_id": "dadfa799-f10f-4af9-ad77-1211136c2a91",
*     "label": "EN",
*     "id": "6493938a-37cf-468a-b853-760c011171ec",
*     "kind": "captions",
*     "srclang": "en"
*   },
*   {
*     "mime_type": "text/vtt",
*     "account_id": "3742124111001",
*     "default": false,
*     "sources": [
*       {
*         "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/3742124111001/201705/1640/3742124111001_c4890c0b-f04c-45f9-8179-361112285099.vtt?pubId=3742124111001&videoId=5435211119001"
*       },
*       {
*         "src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/3742124111001/201705/1640/3742124111001_c4890c0b-f04c-45f9-8179-366451115099.vtt?pubId=3742124111001&videoId=5435211119001"
*       }
*     ],
*     "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/3742124111001/201705/1640/3742124955001_c4890c0b-f04c-45f9-8179-366451115099.vtt?pubId=3742124111001&videoId=5435211119001",
*     "asset_id": "c4890c0b-f04c-45f9-8179-366451115099",
*     "label": "JA",
*     "id": "ba650a72-b41d-49a1-8ad3-5060b111f875",
*     "kind": "captions",
*     "srclang": "ja"
*   }
* ],
* "updated_at": "2017-05-16T00:09:03.505Z",
* "thumbnail": "http://brightcove.vo.llnwd.net/e1/pd/3742124111001/3742124111001_5435271111001_5435211119001-th.jpg?pubId=3742124111001&videoId=5435211119001",
* "poster": "http://brightcove.vo.llnwd.net/e1/pd/3742124111001/3742124111001_5435271115001_5435211119001-vs.jpg?pubId=3742124111001&videoId=5435211119001",
* "offline_enabled": false,
* "link": null,
* "id": "5435211119001",
* "ad_keys": null,
* "thumbnail_sources": [
*   {
*     "src": "http://brightcove.vo.llnwd.net/e1/pd/3742124111001/3742124111001_5435211161001_5435211119001-th.jpg?pubId=3742124111001&videoId=5435211119001"
*   },
*   {
*     "src": "https://brightcove.hs.llnwd.net/e1/pd/3742124111001/3742124111001_5435271111001_5435211119001-th.jpg?pubId=3742124111001&videoId=5435211119001"
*   }
* ],
* "created_at": "2017-05-15T22:33:18.529Z"
*}
*
* ** @apiSuccessExample {json} Dynamic Delivery:
*    HTTP/1.1 200 OK
*    {
* "description": null,
* "poster_sources": [
*   {
*     "src": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/main/1280x720/24s816ms/match/image.jpg"
*   }
* ],
* "tags": [
*   "dd-static"
* ],
* "cue_points": [],
* "custom_fields": {},
* "account_id": "57838016001",
* "sources": [
*   {
*     "ext_x_version": "4",
*     "type": "application/x-mpegURL",
*     "src": "https://manifest.prod.boltdns.net/manifest/v1/hls/v4/clear/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/10s/master.m3u8?fastly_token=NTk1YmE0ZmZfOGU5Njg0NGU1OWQ3NjI3ZDhmY2FhZTVmNGE0YzI1MWM1NjMyNTZkNzMzZmExMzRkN2ZmYzU0YWU5NzUyZTM2YQ%3D%3D"
*   },
*   {
*     "ext_x_version": "5",
*     "type": "application/x-mpegURL",
*     "src": "https://manifest.prod.boltdns.net/manifest/v1/hls/v5/clear/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/10s/master.m3u8?fastly_token=NTk1YmE0ZmZfOTBkOThhYmQ5MWM0MmQwYmQwYTM4MGEzMjAzZTgyNDVlMDYzYzNhMzQ1ZWQ3MTMyMzVmM2Q1YjM2N2VlMjM0Yg%3D%3D"
*   },
*   {
*     "type": "application/dash+xml",
*     "src": "https://manifest.prod.boltdns.net/manifest/v1/dash/live-baseurl/clear/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/2s/manifest.mpd?fastly_token=NTk1YmE0ZmZfYzQyOWJiOTEzMGJmNGIyMjM1NmMwMzZmNGZkZjlkYjEzMzNmNzFlYmQxODg0Y2YzZDk3ZTljNzVhODg1YzRjMQ%3D%3D",
*     "profiles": "urn:mpeg:dash:profile:isoff-live:2011"
*   },
*   {
*     "avg_bitrate": 2129000,
*     "width": 1280,
*     "src": "https://bcbolt446c5271-a.akamaihd.net/media/v1/pmp4/static/clear/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/high.mp4?akamai_token=exp=1499178239~acl=/media/v1/pmp4/static/clear/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/high.mp4*~hmac=5880698556297bbe2f2f43ac8904c659c61fb9510db1a9bb106037eaea393339",
*     "size": 13242064,
*     "height": 720,
*     "duration": 49690,
*     "container": "MP4",
*     "codec": "H264"
*   },
*   {
*     "avg_bitrate": 574000,
*     "width": 480,
*     "src": "https://bcbolt446c5271-a.akamaihd.net/media/v1/pmp4/static/clear/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/mid.mp4?akamai_token=exp=1499178239~acl=/media/v1/pmp4/static/clear/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/mid.mp4*~hmac=75e51439623a41b93d2a234c25683e76d43656f97a9dfb8efe61a5342d5ff2da",
*     "size": 3586929,
*     "height": 270,
*     "duration": 49690,
*     "container": "MP4",
*     "codec": "H264"
*   }
* ],
* "name": "Canada_Geese_Family",
* "reference_id": null,
* "long_description": null,
* "duration": 49633,
* "economics": "AD_SUPPORTED",
* "published_at": "2017-06-05T11:20:52.412Z",
* "text_tracks": [],
* "updated_at": "2017-06-05T12:06:55.121Z",
* "thumbnail": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/main/160x90/24s816ms/match/image.jpg",
* "poster": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/main/1280x720/24s816ms/match/image.jpg",
* "offline_enabled": false,
* "link": null,
* "id": "5459968909001",
* "ad_keys": null,
* "thumbnail_sources": [
*   {
*     "src": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/57838016001/853641cb-d66b-4f08-bb02-8489b5fba897/main/160x90/24s816ms/match/image.jpg"
*   }
* ],
* "created_at": "2017-06-05T11:20:52.412Z"
*}
*
** @apiSuccessExample {json} DRM-packaged Dynamic Delivery:
*    HTTP/1.1 200 OK
*{
* "description": null,
* "poster_sources": [
*   {
*     "src": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/main/1280x720/2s316ms/match/image.jpg"
*   }
* ],
* "tags": [],
* "cue_points": [],
* "custom_fields": {},
* "account_id": "2728142649001",
* "sources": [
*   {
*     "ext_x_version": "5",
*     "type": "application/x-mpegURL",
*     "src": "http://manifest.prod.boltdns.net/manifest/v1/hls/v5/fairplay/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/10s/master.m3u8?fastly_token=NTllOGY3ZjhfOTczOWZhNGY4ZWQxODFjYWFmODRiNDZiMzI2NmM0NWE3OWFjYWJiNTk0ZmUxOGUzZjM3ZDI1ZTA5YjNkMjJlZA%3D%3D",
*     "key_systems": {
*       "com.apple.fps.1_0": {
*         "key_request_url": "https://manifest.prod.boltdns.net/license/v1/fairplay/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/22d62151-eccd-421b-8848-e36a4cbae571?fastly_token=NTllOGY3ZjhfNWVhYTVmYWFmNDYwNTJkNTNmMGMwNmNkNjQwMTE1ZDVmNTE3YTU4Y2VjZTFhYWFkODNhMzExMTczYjk5N2RkNg%3D%3D",
*         "certificate_url": "https://manifest.prod.boltdns.net/license/v1/fairplay_app_cert/2728142649001"
*        }
*      }
*   },
*   {
*     "ext_x_version": "5",
*     "type": "application/x-mpegURL",
*     "src": "https://manifest.prod.boltdns.net/manifest/v1/hls/v5/fairplay/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/10s/master.m3u8?fastly_token=NTllOGY3ZjhfOTczOWZhNGY4ZWQxODFjYWFmODRiNDZiMzI2NmM0NWE3OWFjYWJiNTk0ZmUxOGUzZjM3ZDI1ZTA5YjNkMjJlZA%3D%3D",
*     "key_systems": {
*       "com.apple.fps.1_0": {
*         "key_request_url": "https://manifest.prod.boltdns.net/license/v1/fairplay/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/22d62151-eccd-421b-8848-e36a4cbae571?fastly_token=NTllOGY3ZjhfNWVhYTVmYWFmNDYwNTJkNTNmMGMwNmNkNjQwMTE1ZDVmNTE3YTU4Y2VjZTFhYWFkODNhMzExMTczYjk5N2RkNg%3D%3D",
*         "certificate_url": "https://manifest.prod.boltdns.net/license/v1/fairplay_app_cert/2728142649001"
*       }
*     }
*   },
*   {
*     "type": "application/dash+xml",
*     "src": "http://manifest.prod.boltdns.net/manifest/v1/dash/live-baseurl/bccenc/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/2s/manifest.mpd?fastly_token=NTllOGY3ZjhfOTZiMGJmYzk1ODBjZjc2ODQ3ZTRmZDdlNTA5OTYyNTQ5ZjNiYjlkOWViZTUzZTBiMjJlOGYwODhhZmQ3YWIxNg%3D%3D",
*     "profiles": "urn:mpeg:dash:profile:isoff-live:2011",
*     "key_systems": {
*       "com.widevine.alpha": {
*         "license_url": "https://manifest.prod.boltdns.net/license/v1/cenc/widevine/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/4cbdc140-e254-4365-86d0-55fc10cdfa22?fastly_token=NTllOGY3ZjhfZGU1N2RhMDUyY2ZiZWZjY2QyMDNkY2E2ZTkwOTU5ZjZiM2U4YzU3ZGJlMjJmMjFkYzIyM2ZkOTVlNGRiMDM1Ng%3D%3D"
*       },
*       "com.microsoft.playready": {
*         "license_url": "https://manifest.prod.boltdns.net/license/v1/cenc/playready/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/4cbdc140-e254-4365-86d0-55fc10cdfa22?fastly_token=NTllOGY3ZjhfMjBlYWRiOTU0MGM2MTRmOGVlNzc2NzkyOTI5OTc4ZWUwZTNkMDcwMWIyMzQ3NTEyMDM1NjVmM2NjNGJkNzMzMw%3D%3D"
*       }
*     }
*   },
*   {
*     "type": "application/dash+xml",
*     "src": "https://manifest.prod.boltdns.net/manifest/v1/dash/live-baseurl/bccenc/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/2s/manifest.mpd?fastly_token=NTllOGY3ZjhfOTZiMGJmYzk1ODBjZjc2ODQ3ZTRmZDdlNTA5OTYyNTQ5ZjNiYjlkOWViZTUzZTBiMjJlOGYwODhhZmQ3YWIxNg%3D%3D",
*     "profiles": "urn:mpeg:dash:profile:isoff-live:2011",
*     "key_systems": {
*       "com.widevine.alpha": {
*         "license_url": "https://manifest.prod.boltdns.net/license/v1/cenc/widevine/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/4cbdc140-e254-4365-86d0-55fc10cdfa22?fastly_token=NTllOGY3ZjhfZGU1N2RhMDUyY2ZiZWZjY2QyMDNkY2E2ZTkwOTU5ZjZiM2U4YzU3ZGJlMjJmMjFkYzIyM2ZkOTVlNGRiMDM1Ng%3D%3D"
*       },
*       "com.microsoft.playready": {
*         "license_url": "https://manifest.prod.boltdns.net/license/v1/cenc/playready/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/4cbdc140-e254-4365-86d0-55fc10cdfa22?fastly_token=NTllOGY3ZjhfMjBlYWRiOTU0MGM2MTRmOGVlNzc2NzkyOTI5OTc4ZWUwZTNkMDcwMWIyMzQ3NTEyMDM1NjVmM2NjNGJkNzMzMw%3D%3D"
*       }
*     }
*   }
* ],
* "name": "Lightning-Utrecht",
* "reference_id": null,
* "long_description": null,
* "duration": 4633,
* "economics": "AD_SUPPORTED",
* "published_at": "2017-09-20T12:45:57.347Z",
* "text_tracks": [],
* "updated_at": "2017-09-20T12:47:52.010Z",
* "thumbnail": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/main/160x90/2s316ms/match/image.jpg",
* "poster": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/main/1280x720/2s316ms/match/image.jpg",
* "offline_enabled": false,
* "link": null,
* "id": "5581882937001",
* "ad_keys": null,
* "thumbnail_sources": [
*   {
*     "src": "https://cf-images.us-east-1.prod.boltdns.net/v1/jit/2728142649001/9305d071-0c5b-40dd-8374-9cb3dd5e9515/main/160x90/2s316ms/match/image.jpg"
*   }
* ],
* "created_at": "2017-09-20T12:45:57.347Z"
*}
 *
 * @apiError (Error 400) BAD_REQUEST error_subcode:

 `DUPLICATE_PARAMETERS` - The same parameter name was provided more than once in the request
 * @apiError (Error 401) INVALID_POLICY_KEY Must be a legal policy key in an [appropriate header](https://support.brightcove.com/node/17906#authentication).
 * @apiError (Error 403) ACCESS_DENIED error_subcode:

 `ACCOUNT_ID`  - The account id in the policy key does not match the account in the api request

 `CLIENT_GEO` - The video is restricted from playing in the current geo region; the message will contain additional information about the specific issue. For more details, see the [Playback API Error Reference](https://support.brightcove.com/node/17903)

 `CLIENT_IP` - The video is restricted at the current IP address

 `DOMAIN` - The video is restricted from playing on the current domain

 `POLICY_ERROR` - Error when evaluating the policy key

 `VIDEO_NOT_PLAYABLE` - For a single video request, the video exists, but is not allowed to be played now. That could be any of the three reasons that videos are not playable: not sufficiently ingested, not active, not in scheduled date range.
 * @apiError (Error 404) NOT_FOUND error_subcode:

 `VIDEO_NOT_FOUND` - The requested resource is not available.
 * @apiError (Error 405) METHOD_NOT_ALLOWED Only `GET`, `HEAD` and `OPTIONS` are allowed for this api.
 * @apiError (Error 500) SERVER_ERROR Internal server error.
 * @apiError (Error 502) SERVER_ERROR Got a bad response from a backend server.

 Various `*_RETRIEVE_FAILURE` error codes: `ACCOUNT_RETRIEVE_FAILURE`, `VIDEO_RETRIEVE_FAILURE`, `VIDEO_URLS_RETRIEVE_FAILURE`.
 * @apiError (Error 503) SERVICE_UNAVAILABLE Returned this response from a backend server.
 * @apiError (Error 504) SERVER_TIMEOUT Either a backend server or one of the servers they rely on timed out.
.
 *
 * @apiErrorExample {json} 404 Error Response
 *     HTTP/1.1 404 Not Found
 *     [
 *         {
 *             "error_code": "VIDEO_NOT_FOUND"
 *         }
 *     ]
 *
 *
 */
