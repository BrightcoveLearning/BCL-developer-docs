// get report

/**
 * @api {get} /data Get Analytics Report
 * @apiName Get Analytics Report
 * @apiGroup Report
 * @apiVersion 1.0.0
 *
 * @apiDescription Get an analytics report on one or more dimensions. Note that the fields returned in the response will vary according to the dimension(s) requested and the fields specified in the `fields` parameter
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 * @apiHeader {String} Accept-Encoding Accept-Encoding: gzip (optional)
 *
 * @apiParam (URL Parameters) {String} accounts one or more Video Cloud account IDs separated by commas
 * @apiParam (URL Parameters) {Integer} [limit=10] number of videos to return
 * @apiParam (URL Parameters) {Integer} [offset=0] number of videos to skip in the response
 * @apiParam (URL Parameters) {String} [sort=video_view] field to sort results by (for video dimension reports, valid sort fields include the video metadata fields `video.name`, `video.tags`, `video.reference_id` and `video.custom_fields` - see ([Fields and Sort](https://support.brightcove.com/node/17997#fieldsAndSorting)))
 * @apiParam (URL Parameters) {String} [fields=video_view] fields to return for items; see [Dimensions and Fields](https://support.brightcove.com/node/17997#metrics) for the available fields for each dimension
 * @apiParam (URL Parameters) {String="account","browser_type","city","country","region","date","date-time","device_manufacturer","device_os","device_type","live_stream","player","referrer_domain","destination_domain","search_terms","source_type","video"} dimensions one or more dimensions to report on; see [Multiple Dimensions](https://support.brightcove.com/node/17997#reportDimensions) for which combined dimensions are supported
 * @apiParam (URL Parameters) {String="dimension==value"} [where] one or more dimension==value pairs to filter the results; see [Where Filters](https://support.brightcove.com/node/17997#filterValues) for details
 * @apiParam (URL Parameters) {String} [from="(30 days before now)"] Start time for the period covered by the report &mdash; `alltime` or epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 * @apiParam (URL Parameters) {String} [to="now"] End time for the period covered by the report &mdash; `now` or epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 * @apiParam (URL Parameters) {String="json","csv","xlsx"]} [format="json"] format to return the results in
 * @apiParam (URL Parameters) {Boolean} [reconciled] if true, only reconciled data is returned; if false, only realtime data is returned; if not present, both reconciled and realtime data are returned
 *
 * @apiParamExample {String} Video Dimension Report Example:
 *     https://analytics.api.brightcove.com/v1/data?accounts=20318290001&dimensions=video&fields=video_view,video_impression&limit=1
 *
 * @apiSuccess (200) {String} account the Video Cloud account id
 * @apiSuccess (200) {String} account.name the name of the Video Cloud account id
 * @apiSuccess (200) {Integer} item_count the total number of items matching the request
 * @apiSuccess (200) {Object[]} items array of analytics objects for the videos returned
 * @apiSuccess (200) {Integer} items.ad_mode_begin number of times a player entered ad mode
 * @apiSuccess (200) {Integer} items.ad_mode_complete number of times a player completed ad mode
 * @apiSuccess (200) {Number} items.bytes_delivered the total bytes of data delivered, including the videos, other assets such as images and captions, and (for player reports) the player code &mdash; some of the date is obtained from CDNs and may not be available for up to 3 days
 * @apiSuccess (200) {Number} items.engagement_score the calculated engagement score for the video
 * @apiSuccess (200) {Number} items.play_rate video views divided by video impressions
 * @apiSuccess (200) {Integer} items.play_request number of play requests received for a video
 * @apiSuccess (200) {String} items.video the video id
 * @apiSuccess (200) {String} items.duration the duration of the video in seconds (note that the duration is available only if there is at least one `video_view`)
 * @apiSuccess (200) {Number} items.video_engagement_1 number of views at the 1% point of the video duration
 * @apiSuccess (200) {Number} items.video_engagement_25 number of views at the 25% point of the video duration
 * @apiSuccess (200) {Number} items.video_engagement_50 number of views at the 50% point of the video duration
 * @apiSuccess (200) {Number} items.video_engagement_75 number of views at the 75% point of the video duration
 * @apiSuccess (200) {Number} items.video_engagement_100 number of views at the 100% point of the video duration
 * @apiSuccess (200) {Integer} items.video_impression number of times the video was loaded in a player
 * @apiSuccess (200) {String} items.name name of the video
 * @apiSuccess (200) {Number} items.video_percent_viewed average percentage of the video played when viewed
 * @apiSuccess (200) {Number} items.video_seconds_viewed total seconds of the video viewed
 * @apiSuccess (200) {Integer} items.video_view number of times some portion of the video was viewed
 * @apiSuccess (200) {Object} summary of all videos matching this request that had views
 * @apiSuccess (200) {Number} video_engagement_1 number of views at the 1% point of the video duration for all videos
 * @apiSuccess (200) {Number} video_engagement_25 number of views at the 25% point of the video duration for all videos
 * @apiSuccess (200) {Number} video_engagement_50 number of views at the 50% point of the video duration for all videos
 * @apiSuccess (200) {Number} video_engagement_75 number of views at the 75% point of the video duration for all videos
 * @apiSuccess (200) {Number} video_engagement_100 number of views at the 100% point of the video duration for all videos
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account": "20318290001",
 *        "account.name": "BC Training Videos",
 *        "item_count": 125,
 *        "items": [
 *            {
 *                "engagement_score": 189.443,
 *                "play_rate": 0.667,
 *                "video": "2127084613001",
 *                "video_duration": "341",
 *                "video_engagement_1": 3.0000000000000004,
 *                "video_engagement_25": 3.0000000000000004,
 *                "video_engagement_50": 4.000000000000001,
 *                "video_engagement_75": 4.000000000000001,
 *                "video_engagement_100": 3.0000000000000004,
 *                "video_impression": 3,
 *                "video_name": "Live Streaming using Telestream Wirecast (Japanese)",
 *                "video_percent_viewed": 378.88563049853377,
 *                "video_seconds_viewed": 1292,
 *                "video_view": 2
 *            }
 *        ],
 *        "summary": {
 *            "video_engagement_1": 1875.083,
 *            "video_engagement_25": 1356.95,
 *            "video_engagement_50": 1107.931,
 *            "video_engagement_75": 956.374,
 *            "video_engagement_100": 777.37,
 *            "video_seconds_viewed": 238952,
 *            "video_percent_viewed": 115377.945,
 *            "video_impression": 11479,
 *            "video_view": 2013,
 *            "play_rate": 0.175,
 *            "engagement_score": 57.316
 *        }
 *    }
 *
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your policy key is correct
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} BAD_REQUEST 400: The message fields of the response contains information about what caused the error such as `invalid value for sort parameter`
 * @apiError (Error 4xx) {Object[]} UNSUPPORTED_FIELD_COMBINATION_ERROR 400: The message fields of the response contains information about what invalid fields were specifed
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: This error occurs when the api request is made with an HTTP method other than GET
 * @apiError (Error 5xx) {Object[]} SERVER_ERROR 500: Issue in Brightcove system; try again later
 * @apiError (Error 5xx) {Object[]} PROCESSING 500: The analytics API may send back this message if it encounters a long running query. Once the query has finished it will be stored in the server’s cache for up to 5 minutes. Therefore we suggest querying the API 4 minutes after receiving this error
 *
 * @apiErrorExample {Object[]} 404 Error Response
 *     HTTP/1.1 404 Not Found
 *    [
 *        {
 *            "error_code": "NOT_FOUND",
 *            "message": "Requested resource does not exist",
 *            "request_id": "df35af83-ac9b-44b0-b172-a80a11bd0bfa"
 *        }
 *    ]
 *
 *
 */
