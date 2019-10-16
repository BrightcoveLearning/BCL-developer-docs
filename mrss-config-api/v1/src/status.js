// get status

/**
 * @api {get} /data/status Get Available Date Range
 * @apiName Get Available Date Range
 * @apiGroup Report
 * @apiVersion 1.0.0
 *
 * @apiDescription Get the date range for which reconciled data is available for any Analytics API report. All parameters are allowed, but only `account`, `dimensions`, and `where` affect the result &mdash; all others are ignored.
 * **Note that date range for this request must fall within the available date range for the dimensions requested &mdash; the simplest thing to do is to use `from=alltime`**
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 * @apiHeader {String} Accept-Encoding Accept-Encoding: gzip (optional)
 *
 * @apiParam (URL Parameters) {String} accounts one or more Video Cloud account IDs separated by commas
 * @apiParam (URL Parameters) {Integer} [limit=10] ignored
 * @apiParam (URL Parameters) {Integer} [offset=0] ignored
 * @apiParam (URL Parameters) {String} [sort=video_view] ignored
 * @apiParam (URL Parameters) {String} [fields=video_view] ignored
 * @apiParam (URL Parameters) {String="account","city","country","region","date","date-time","device_os","device_type","player","referrer_domain","destination_domain","search_terms","source_type","video"} dimensions one or more dimensions to report on; see [Multiple Dimensions](https://support.brightcove.com/node/17997#reportDimensions) for which combined dimensions are supported
 * @apiParam (URL Parameters) {String="dimension==value"} [where] one or more dimension==value pairs to filter the results; see [Where Filters](https://support.brightcove.com/node/17997#filterValues) for details
 * @apiParam (URL Parameters) {mixed} [from="(30 days before now)"] ignored
 * @apiParam (URL Parameters) {mixed} [to="now"] ignored
 * @apiParam (URL Parameters) {String="json","csv","xlsx"]} [format="json"] ignored
 * @apiParam (URL Parameters) {Boolean} [reconciled] if true, only reconciled data is returned; if false, only realtime data is returned; if not present, both reconciled and realtime data are returned
 *
 * @apiParamExample {String} Video Dimension Report Example:
 *     https://analytics.api.brightcove.com/v1/data/status?accounts=20318290001&dimensions=account,device_os,country
 *
 * @apiSuccess (200) {String} reconciled_from the earliest date that you can use for `from` and get reconciled data
 * @apiSuccess (200) {String} reconciled_to the latest date that you can use for `to` and get reconciled data (realtime data may be available for later dates)
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "reconciled_from": "2015-10-19",
 *        "reconciled_to": "2015-11-04"
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
 *    HTTP/1.1 400 BAD_REQUEST
 *    [
 *        {
 *            "error_code": "TIME_RANGE_UNAVAILABLE",
 *            "message": "data is not available for the requested dimensions during the requested time period",
 *            "request_id": "4f13a9e1-2e0b-4fef-a040-d67846493bd6"
 *        }
 *    ]
 *
 *
 */
