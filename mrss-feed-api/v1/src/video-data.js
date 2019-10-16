// get alltime video views

/**
 * @api {get} /alltime/accounts/:account_id/videos/:video_id Get Alltime Video Views
 * @apiName Get Alltime Video Views
 * @apiGroup Video Data
 * @apiVersion 1.0.0
 *
 * @apiDescription returns the total alltime video views for a video
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 * @apiHeader {String} Accept-Encoding Accept-Encoding: gzip (optional)
 *
 * @apiParam (Path Parameters) {String} account_id a Video Cloud account ID
 * @apiParam (Path Parameters) {String} video_id a Video Cloud video ID
 *
 * @apiParamExample {String} Video Dimension Report Example:
 *     https://analytics.api.brightcove.com/v1/alltime/accounts/20318290001/videos/2660272749001
 *
 * @apiSuccess (200) {Integer} alltime_video_views all-time video views
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "alltime_video_views": 7690
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your policy key is correct
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} BAD_REQUEST 400: The message fields of the response contains information about what caused the error such as `invalid value for sort parameter`
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: This error occurs when the api request is made with an HTTP method other than GET
 * @apiError (Error 5xx) {Object[]} SERVER_ERROR 500: Issue in Brightcove system; try again later
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
 */
