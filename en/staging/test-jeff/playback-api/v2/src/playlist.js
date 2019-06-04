/**
 * @apiDefine playlistGroup Playlist
 * Playlist operations allow you to retrieve playlists from your Video Cloud library.
 */
// get playlist by id

/**
 * @api {get} /accounts/:account_id/playlists/:playlist_id Get Playlist by ID or Reference ID
 * @apiName Get Playlists by ID or Reference ID
 * @apiGroup playlistGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a playlist object for an account, based on playlist ID or reference ID.
 <br><br>
 *
 * @apiHeader {String} Accept: application/json;pk=policy_key (there are 3 ways to authenticate &mdash; use one of these three headers) See [Policy API Overview](https://support.brightcove.com/node/18003) or [Policy Keys](https://support.brightcove.com/node/18125) for information on getting policy keys
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {Number} playlist_id Video Cloud playlist ID
 * @apiParam (URL Parameters) {Number{1-100}} [limit=20] The number of videos to return
 * @apiParam (URL Parameters) {Number} [offset=0] The number of videos to skip
 * @apiParam (URL Parameters) {String} [ad_config_id] include [server-side ad insertion](https://support.brightcove.com/node/17906#Video_request_with_SSAI)
 *
 * @apiParamExample {String} Get Playlists Example:
 *     https://edge.api.brightcove.com/playback/v1/accounts/57838016001/playlists/749117323001
 *     // or
 *     https://edge.api.brightcove.com/playback/v1/accounts/57838016001/playlists/ref:my_reference_id
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {String} created_at date/time created
 * @apiSuccess (200) {String} description playlist description
 * @apiSuccess (200) {String} id the playlist id
 * @apiSuccess (200) {String} name the playlist name
 * @apiSuccess (200) {String} reference_id the playlist reference id
 * @apiSuccess (200) {String} type the playlist type: EXPLICIT or smart playlist type
 * @apiSuccess (200) {String} updated_at date/time last modified
 * @apiSuccess (200) {String[]} video_ids array of video ids (EXPLICIT playlists only)
 * @apiSuccess (200) {String} search search string to retrieve the videos (smart playlists only)
 * @apiSuccess (200) {Object[]} videos array of video maps
 * @apiSuccess (200) {String} videos.id video id
 * @apiSuccess (200) {String} videos.name video title
 * @apiSuccess (200) {String} videos.created_at when the video was created
 * @apiSuccess (200) {Object} videos.custom_fields={} map of fieldname-value pairs
 * @apiSuccess (200) {Object} videos.cue_points array of cue point maps
 * @apiSuccess (200) {String} videos.cue_points.name cue point name
 * @apiSuccess (200) {String} videos.cue_points.type=AD cue point type
 * @apiSuccess (200) {Number} videos.cue_points.time time of the cue point in seconds; example: 10.527
 * @apiSuccess (200) {String} videos.cue_points.metadata=null optional metadata string (128 single-byte characters maximum)
 * @apiSuccess (200) {Boolean} videos.cue_points.force-stop=false whether video is force-stopped at the cue point
 * @apiSuccess (200) {String} videos.description video short description
 * @apiSuccess (200) {Number} videos.duration video duration in milliseconds
 * @apiSuccess (200) {String} videos.economics whether video is AD_SUPPORTED
 * @apiSuccess (200) {Object[]} videos.poster_sources array of poster source maps (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} videos.poster_sources.src URL for a poster source image (note that in many cases there will be one source with a `src` value identical to the `poster` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} videos.poster URL for the default poster source image
 * @apiSuccess (200) {String} videos.projection The mapping projection for 360° videos, e.g. "equirectangular"
 * @apiSuccess (200) {Object[]} videos.thumbnail_sources array of thumbnail source maps (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} videos.thumbnail_sources.src URL for a thumbnail source image (note that in many cases there will be one source with a `src` value identical to the `thumbnail` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} videos.thumbnail URL for the default thumbnail source image
 * @apiSuccess (200) {Object} videos.link map of scheduling properties
 * @apiSuccess (200) {String} videos.link.text text for the link
 * @apiSuccess (200) {String} videos.link.url URL for the link
 * @apiSuccess (200) {String} videos.long_description video long description
 * @apiSuccess (200) {Boolean} videos.offline_enabled whether video is enabled for offline viewing
 * @apiSuccess (200) {String} videos.reference_id video reference-id (must be unique within the account)
 * @apiSuccess (200) {String[]} videos.tags array of tags
 * @apiSuccess (200) {Object[]} videos.sources array of video sources (renditions)
 * @apiSuccess (200) {Number} videos.sources.avg_bitrate average bitrate
 * @apiSuccess (200) {Number} videos.sources.width frame width in pixels
 * @apiSuccess (200) {Number} videos.sources.height frame height in pixels
 * @apiSuccess (200) {Number} videos.sources.size size in bytes
 * @apiSuccess (200) {Number} videos.sources.duration duration in milliseconds
 * @apiSuccess (200) {String} videos.sources.asset_id the asset id for the source
 * @apiSuccess (200) {String} videos.sources.stream_name the stream name for the source
 * @apiSuccess (200) {String} videos.sources.codec the video codec
 * @apiSuccess (200) {String} videos.sources.container the video container
 * @apiSuccess (200) {String} videos.sources.app_name the address for rtmp streams
 * @apiSuccess (200) {String} videos.sources.type the type (for HLS streams)
 * @apiSuccess (200) {Object} videos.text_tracks array of text track maps
 * @apiSuccess (200) {String} videos.text_tracks.src URL for the .vtt file
 * @apiSuccess (200) {Object[]} videos.text_tracks.sources array of sources for .vtt files (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} videos.text_tracks.sources.src URL for the .vtt file (note that in many cases there will be one source with a `src` value identical to the `text_tracks.src` value, but this array is included in case there are multiple protocols available, such as `http` and `https`)
 * @apiSuccess (200) {String} videos.text_tracks.kind kind of text track
 * @apiSuccess (200) {String} videos.text_tracks.srclang 2-letter language code, such as "en" or "ko"
 * @apiSuccess (200) {String} videos.text_tracks.mime_type mime_type for the track
 * @apiSuccess (200) {String} videos.text_tracks.label label for the track
 * @apiSuccess (200) {Boolean} videos.text_tracks.default whether this is the default track
 * @apiSuccess (200) {String} videos.text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
 * @apiSuccess (200) {String} videos.updated_at when the video was last modified
 * @apiSuccess (200) {Object} videos.ad_keys=null map of key/value pairs for ad requests
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *    {
 *        "videos": [
 *            {
 *                "description": "A small friendly bird...",
 *                "economics": "AD_SUPPORTED",
 *                "poster_sources": [
 *                    {
 *                        "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480075001_Bird-Chickadee-vs.jpg?pubId=57838016001&videoId=4084164751001"
 *                    }
 *                ],
 *                "tags": [
 *                    "air",
 *                    "bird",
 *                    "nature"
 *                ],
 *                "cue_points": [
 *
 *                ],
 *                "custom_fields": {
 *
 *                },
 *                "account_id": "57838016001",
 *                "sources": [
 *                    {
 *                        "avg_bitrate": 1108347,
 *                        "width": 640,
 *                        "duration": 8240,
 *                        "size": 1141597,
 *                        "stream_name": "mp4:57838016001/201502/1437/57838016001_4084480003001_Bird-Chickadee.mp4&1442941200000&e7edf0ea40d24cf24f504bb34b8d6875",
 *                        "codec": "H264",
 *                        "asset_id": "4084480003001",
 *                        "container": "MP4",
 *                        "height": 344,
 *                        "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/v1/uds/rtmp"
 *                    },
 *                    {
 *                        "avg_bitrate": 1108347,
 *                        "width": 640,
 *                        "src": "http://brightcove.vo.llnwd.net/v1/uds/pd/57838016001/201502/1437/57838016001_4084480003001_Bird-Chickadee.mp4?pubId=57838016001&videoId=4084164751001",
 *                        "size": 1141597,
 *                        "height": 344,
 *                        "duration": 8240,
 *                        "container": "MP4",
 *                        "codec": "H264",
 *                        "asset_id": "4084480003001"
 *                    },
 *                    {
 *                        "type": "application/x-mpegURL",
 *                        "src": "http://c.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=4084164751001&pubId=57838016001",
 *                        "container": "M2TS",
 *                        "codec": "H264"
 *                    },
 *                    {
 *                        "type": "application/x-mpegURL",
 *                        "src": "https://secure.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=4084164751001&pubId=57838016001&secure=true",
 *                        "container": "M2TS",
 *                        "codec": "H264"
 *                    }
 *                ],
 *                "name": "Chickadee",
 *                "reference_id": "Bird_Chickadee.mp4_1425064251252",
 *                "long_description": null,
 *                "duration": 8240,
 *                "economics": "AD_SUPPORTED",
 *                "published_at": "2015-02-27T19:10:55.425Z",
 *                "text_tracks": [
 *
 *                ],
 *                "updated_at": "2015-02-27T19:11:57.808Z",
 *                "thumbnail": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480007001_Bird-Chickadee-th.jpg?pubId=57838016001&videoId=4084164751001",
 *                "poster": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480075001_Bird-Chickadee-vs.jpg?pubId=57838016001&videoId=4084164751001",
 *                "link": null,
 *                "id": "4084164751001",
 *                "ad_keys": null,
 *                "thumbnail_sources": [
 *                    {
 *                        "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201502/1437/57838016001_4084480007001_Bird-Chickadee-th.jpg?pubId=57838016001&videoId=4084164751001"
 *                    }
 *                ],
 *                "created_at": "2015-02-27T19:10:55.425Z"
 *            },
 *            {
 *                "description": "Bugs-Butterfly",
 *                "poster_sources": [
 *                    {
 *                        "src": "http://brightcove.vo.llnwd.net/e1/pd/57838016001/57838016001_1530823798001_vs-4f71d15b7737b0e4346504a7.jpg?pubId=57838016001&videoId=1532562858001"
 *                    }
 *                ],
 *                "tags": [
 *                    "newtag"
 *                ],
 *                "cue_points": [
 *
 *                ],
 *                "custom_fields": {
 *                    "purpose": "Training"
 *                },
 *                "account_id": "57838016001",
 *                "sources": [
 *                    {
 *                        "avg_bitrate": 300000,
 *                        "width": 400,
 *                        "duration": 27495,
 *                        "size": 881490,
 *                        "stream_name": "mp4:57838016001/57838016001_1530823792001_Bugs-Butterfly.mp4&1442941200000&e7edf0ea40d24cf24f504bb34b8d6875",
 *                        "codec": "H264",
 *                        "asset_id": "1530823792001",
 *                        "container": "MP4",
 *                        "height": 224,
 *                        "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/e1/uds/rtmp/ondemand"
 *                    },
 *                    {
 *                        "avg_bitrate": 300000,
 *                        "width": 400,
 *                        "src": "http://brightcove.vo.llnwd.net/e1/uds/pd/57838016001/57838016001_1530823792001_Bugs-Butterfly.mp4?pubId=57838016001&videoId=1532562858001",
 *                        "size": 881490,
 *                        "height": 224,
 *                        "duration": 27495,
 *                        "container": "MP4",
 *                        "codec": "H264",
 *                        "asset_id": "1530823792001"
 *                    },
 *                    {
 *                        "type": "application/x-mpegURL",
 *                        "src": "http://c.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=1532562858001&pubId=57838016001",
 *                        "container": "M2TS",
 *                        "codec": "H264"
 *                    },
 *                    {
 *                        "type": "application/x-mpegURL",
 *                        "src": "https://secure.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=1532562858001&pubId=57838016001&secure=true",
 *                        "container": "M2TS",
 *                        "codec": "H264"
 *                    }
 *                ],
 *                "name": "Bugs-Butterfly",
 *                "reference_id": "1532562858001",
 *                "long_description": null,
 *                "duration": 27495,
 *                "economics": "AD_SUPPORTED",
 *                "published_at": "2012-03-27T14:40:26.188Z",
 *                "text_tracks": [
 *
 *                ],
 *                "updated_at": "2015-09-07T06:27:58.071Z",
 *                "thumbnail": "http://brightcove.vo.llnwd.net/e1/pd/57838016001/57838016001_1530823799001_th-4f71d15b7737b0e4346504a7.jpg?pubId=57838016001&videoId=1532562858001",
 *                "poster": "http://brightcove.vo.llnwd.net/e1/pd/57838016001/57838016001_1530823798001_vs-4f71d15b7737b0e4346504a7.jpg?pubId=57838016001&videoId=1532562858001",
 *                "link": null,
 *                "id": "1532562858001",
 *                "ad_keys": null,
 *                "thumbnail_sources": [
 *                    {
 *                        "src": "http://brightcove.vo.llnwd.net/e1/pd/57838016001/57838016001_1530823799001_th-4f71d15b7737b0e4346504a7.jpg?pubId=57838016001&videoId=1532562858001"
 *                    }
 *                ],
 *                "created_at": "2012-03-27T14:40:26.188Z"
 *            }
 *        ],
 *        "updated_at": "2015-09-20T18:45:52.606Z",
 *        "type": "EXPLICIT",
 *        "reference_id": null,
 *        "name": "Manual",
 *        "id": "749117323001",
 *        "description": null,
 *        "created_at": "2011-01-13T18:46:03.883Z",
 *        "account_id": "57838016001"
 *    }
 *
 * @apiError (Error 400) BAD_REQUEST error_subcode:

 `DUPLICATE_PARAMETERS` - The same parameter name was provided more than once in the request
 * @apiError (Error 401) INVALID_POLICY_KEY Must be a legal policy key in an [appropriate header](https://support.brightcove.com/node/17906#authentication).
 * @apiError (Error 403) ACCESS_DENIED error_subcodes:

 `ACCOUNT_ID`  - The account id in the policy key does not match the account in the api request

 `DOMAIN` - The video is restricted from playing on the current domain

 `CLIENT_GEO` - The video is restricted from playing in the current geo region; the message will contain additional information about the specific issue. For more details, see the [Playback API Error Reference](https://support.brightcove.com/node/17903)

 `CLIENT_IP` - The video is restricted at the current IP address

 `POLICY_ERROR` - Error when evaluating the policy key
 * @apiError (Error 404) NOT_FOUND error_subcode:

 `PLAYLIST_NOT_FOUND` - The requested resource is not available.
 * @apiError (Error 405) METHOD_NOT_ALLOWED Only `GET`, `HEAD` and `OPTIONS` are allowed for this api.
 * @apiError (Error 500) SERVER_ERROR Internal server error.
 * @apiError (Error 502) SERVER_ERROR Got a bad response from a backend server.
 *
 Various `*_RETRIEVE_FAILURE` error codes: `ACCOUNT_RETRIEVE_FAILURE`, `PLAYLIST_RETRIEVE_FAILURE`, `PLAYLIST_VIDEOS_RETRIEVE_FAILURE`.
 * @apiError (Error 503) SERVICE_UNAVAILABLE Returned this response from a backend server.
 * @apiError (Error 504) SERVER_TIMEOUT Either a backend server or one of the servers they rely on timed out.
 *
 * @apiErrorExample {json} 404 Error Response
 *     HTTP/1.1 404 Not Found
 *     [
 *         {
 *             "error_code": "PLAYLIST_NOT_FOUND"
 *         }
 *     ]
 *
 *
 */
