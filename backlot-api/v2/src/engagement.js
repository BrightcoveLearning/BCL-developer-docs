// get engagement report by account

/**
 * @api {get} /engagement/accounts/:account_id Get Account Engagement
 * @apiName Get Account Engagement
 * @apiGroup Engagement
 * @apiVersion 1.0.0
 *
 * @apiDescription Get a summary report of engagement for the account. Note:
 * 1. Engagement reports are only available for periods within the past 32 days. Requests outside that range will return an error
 * 2. The only parameters supported for Engagement reports are `from` and `to`
 * 3. Engagement reports are available for single accounts only - reports on multiple accounts will not work
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 * @apiHeader {String} Accept-Encoding Accept-Encoding: gzip (optional)
 *
 * @apiParam (Path Parameters) {String} account_id a Video Cloud account ID
 * @apiParam (URL Parameters) {String} [from="(30 days before now)"] Start time for the period covered by the report &mdash; epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 * @apiParam (URL Parameters) {String} [to="now"] End time for the period covered by the report &mdash; epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 *
 * @apiParamExample {String} Video Dimension Report Example:
 *     https://analytics.api.brightcove.com/v1/engagement/accounts/20318290001
 *
 * @apiSuccess (200) {Object} timeline detailed engagement data
 * @apiSuccess (200) {String} timeline.type type of data in the `values` array
 * @apiSuccess (200) {Number[]} timeline.values array of views in each 100th part of video duration
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "timeline":{
 *            "type":"percentile",
 *            "values":[6153.16,5850.24,5581.33,5338.86,5153.62,5022.97,4912.26,4807.87,4715.83,4646.73,4603.09,4571.91,4523.94,4487.29,4445.27,4407.97,4380.57,4350.83,4305.49,4243.03,4211.5,4167.62,4124.87,4080.44,4064.16,4018.67,3985,3944.24,3916.86,3880.34,3840.7,3821.87,3795.75,3774.92,3750.34,3732.99,3703.09,3686.11,3661.87,3650.8,3610.64,3584.09,3545.07,3516.15,3491.22,3450.7,3412.2,3389.83,3387.64,3364.07,3361.53,3350.72,3337.98,3320.95,3287.75,3273.17,3241.1,3209.6,3176.8,3173.18,3138.19,3125.17,3095.23,3079.62,3058.27,3039.31,3009.82,2977.99,2964.75,2955.75,2932.5,2914.99,2902.7,2880.58,2881.75,2863.65,2849.35,2819.21,2793.2,2769.22,2773.77,2758.13,2764.13,2742.38,2736.89,2724.19,2700.26,2681.57,2653.3,2635.27,2613.04,2580.96,2551.63,2536.11,2497.8,2453.68,2399.81,2358.69,2288.65,2090.52]
 *        }
 *    }
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
 */


 // get engagement report by player

/**
 * @api {get} /engagement/accounts/:account_id/players/:player_id Get Player Engagement
 * @apiName Get Player Engagement
 * @apiGroup Engagement
 * @apiVersion 1.0.0
 *
 * @apiDescription Get a summary report of engagement for a player. Note:
 * 1. Engagement reports are only available for periods within the past 32 days. Requests outside that range will return an error
 * 2. The only parameters supported for Engagement reports are `from` and `to`
 * 3. Engagement reports are available for single accounts only - reports on multiple accounts will not work
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 * @apiHeader {String} Accept-Encoding Accept-Encoding: gzip (optional)
 *
 * @apiParam (Path Parameters) {String} account_id a Video Cloud account ID
 * @apiParam (Path Parameters) {String} [player_id] a Video Cloud player ID
 * @apiParam (URL Parameters) {String} [from="(30 days before now)"] Start time for the period covered by the report &mdash; epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 * @apiParam (URL Parameters) {String} [to="now"] End time for the period covered by the report &mdash; epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 *
 * @apiParamExample {String} Video Dimension Report Example:
 *     https://analytics.api.brightcove.com/v1/engagement/accounts/20318290001/players/1039236672001
 *
 * @apiSuccess (200) {Object} timeline detailed engagement data
 * @apiSuccess (200) {String} timeline.type type of data in the `values` array
 * @apiSuccess (200) {Number[]} timeline.values array of views in each 100th part of video duration
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "timeline":{
 *            "type":"percentile",
 *            "values":[1806.43,1696.66,1569.22,1464.17,1397.83,1333.76,1285.34,1226.16,1190.87,1163.23,1150.44,1143.5,1135.17,1127.28,1112.85,1099.33,1082.13,1065.98,1051.82,1035.38,1014.95,996.63,981.98,964.94,956.6,945.33,932.03,916.25,909.34,892.95,875.89,863.02,859.96,860,851.38,849.22,839.31,833.68,826.66,823.25,811.09,795.21,778.31,767.78,762.23,746.09,734.28,713.25,716.7,706.48,698.54,696.62,698.49,696.67,690.09,685.43,683.72,667.53,656.86,664.41,649.81,647.26,635.72,627.29,623.66,618.24,608.06,599.16,598.17,591.8,583.26,570.62,573.02,567.67,569.37,565.94,562.8,555.46,551.54,545.24,550.43,551.47,556.55,553.18,555.96,550.21,543.79,541.23,533.42,532.6,525.49,519.19,515.4,513.1,505.78,491.8,480.09,472.9,452.47,429.86]
 *        }
 *    }
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
 */

// get engagement by video

/**
 * @api {get} /engagement/accounts/:account_id/videos/:video_id Get Video Engagement
 * @apiName Get Video Engagement
 * @apiGroup Engagement
 * @apiVersion 1.0.0
 *
 * @apiDescription Get a summary report of engagement for a video. Note:
 * 1. Engagement reports are only available for periods within the past 32 days. Requests outside that range will return an error
 * 2. The only parameters supported for Engagement reports are `from` and `to`
 * 3. Engagement reports are available for single accounts only - reports on multiple accounts will not work
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 * @apiHeader {String} Accept-Encoding Accept-Encoding: gzip (optional)
 *
 * @apiParam (Path Parameters) {String} account_id a Video Cloud account ID
 * @apiParam (Path Parameters) {String} [video_id] a Video Cloud video ID
 * @apiParam (URL Parameters) {String} [from="(30 days before now)"] Start time for the period covered by the report &mdash; epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 * @apiParam (URL Parameters) {String} [to="now"] End time for the period covered by the report &mdash; epoch time in milliseconds or a date in the format `yyyy-mm-dd` (such as `2013-09-26`)
 *
 * @apiParamExample {String} Video Dimension Report Example:
 *     https://analytics.api.brightcove.com/v1/engagement/accounts/20318290001/videos/2660272749001
 *
 * @apiSuccess (200) {Object} timeline detailed engagement data
 * @apiSuccess (200) {String} timeline.type type of data in the `values` array
 * @apiSuccess (200) {Number[]} timeline.values array of views in each 100th part of video duration
 * @apiSuccess (200) {String} video_duration the video duration in seconds
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "timeline":{
 *            "type":"percentile",
 *            "values":[348.07,322.79,278.37,234.37,211.84,188.07,184.37,179.38,174.3,168.96,164.26,159.68,152.61,148.05,141.25,137.19,129.83,123.63,118.95,110.85,105.17,99.37,93.16,92.19,93.02,91.25,90.52,85.91,83.24,81.24,77.81,76,77.37,76.76,75.43,73.83,71.04,65.98,65.35,64.6,65.25,61.59,61.82,63.78,63.99,60.75,60.83,56.18,57.15,56.92,51.98,50.29,53.63,54.01,57.82,57.34,55.56,52.07,49.31,51.34,45.87,46.08,38.11,36.45,33.31,32.69,32.7,29.16,27.43,26.88,28.64,28.93,29.48,26.54,26.7,25.9,26.07,26.1,25.24,22.83,22.52,22.37,23.76,21.61,20.4,20.42,18.81,19.7,17.63,17,19.08,18.92,19.01,17.78,17.93,16.89,16.86,16.42,14.31,14.24]
 *        },
 *        "video_duration":"415"
 *    }
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
 */
