// List Credentials

/**
 * @api {get} /v1/credentials List Credentials
 * @apiName List Credentials
 * @apiGroup Credentials
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint can be used to get user credentials for a given user provided one has an API key.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 *
 * @apiParamExample {String} List Credentials Example:
 *    https://api.bcovlive.io/v1/credentials
 *
 *
 * @apiSuccess (200) {Object} user_id The user id
 * @apiSuccess (200) {Object[]}  Array of credentials objects
 * @apiSuccess (200) {Boolean} credentials.credential_default_for_type The clip label (from the input)
 * @apiSuccess (200) {String} credentials.user_id The user id
 * @apiSuccess (200) {String} credentials.credential_private The private key for the credential (not shown; represented by asterisks)
 * @apiSuccess (200) {String} credentials.type The credential type
 * @apiSuccess (200) {String} credentials.label The label used to reference the credential in requests
 * @apiSuccess (200) {String} credentials.credential_id The credential id
 * @apiSuccess (200) {String} credentials.credential_public The public key for the credential
 *
 * @apiSuccessExample {Object} List Credentials
 *    HTTP/1.1 200 OK
 *    {
 *    	"user_id": "c2691d4d039040be96c190a949d754a7",
 *    	"credentials": [
 *    		{
 *    			"credential_default_for_type": true,
 *    			"user_id": "c2691d4d039040be96c190a949d754a7",
 *    			"credential_private": "*************",
 *    			"credential_type": "videocloud",
 *    			"credential_label": "bc-rcrooks-vc",
 *    			"credential_id": "cbdd669730aa4ecfa34a74913df32026",
 *    			"credential_public": "553d4903-4547-435d-944c-2c8e2f6abc5d"
 *    		},
 *    		{
 *    			"credential_default_for_type": true,
 *    			"user_id": "c2691d4d039040be96c190a949d754a7",
 *    			"credential_type": "oauth",
 *    			"credential_label": "bcls-oauth",
 *    			"credential_private": "************ey",
 *    			"oauth_settings": {
 *    				"url": "https://api.bcovlive.io/oauth/authorize"
 *    			},
 *    			"credential_id": "ac0f35e240b24081b38ba3e5f040536e",
 *    			"credential_public": "secret-client"
 *    		},
 *    		{
 *    			"credential_default_for_type": false,
 *    			"user_id": "c2691d4d039040be96c190a949d754a7",
 *    			"credential_type": "oauth",
 *    			"credential_label": "rcrooks-oauth",
 *    			"credential_private": "************ey",
 *    			"oauth_settings": {
 *    				"url": "https://api-mocks.a-live.io/oauth/authorize"
 *    			},
 *    			"credential_id": "85bc309ce70049b2b0659e4c0ef85432",
 *    			"credential_public": "secret-client"
 *    		},
 *    		{
 *    			"credential_default_for_type": false,
 *    			"user_id": "c2691d4d039040be96c190a949d754a7",
 *    			"credential_type": "videocloud",
 *    			"credential_label": "BCLearning",
 *    			"credential_private": "************G6ABYS1FMDVE4JNDQ",
 *    			"credential_id": "38385b978469409482e5d59af423b309",
 *    			"credential_public": "b10631d3-7597-4be8-b8b5-dce142f81006"
 *    		},
 *    		{
 *    			"credential_default_for_type": false,
 *    			"user_id": "c2691d4d039040be96c190a949d754a7",
 *    			"credential_private": "************9KeXmce9",
 *    			"credential_type": "s3",
 *    			"credential_label": "BCLS-S3",
 *    			"credential_id": "646ae46351074fcdaea52542903c3d16",
 *    			"credential_public": "AKIAIVCKQ7XZRGUIBBWQ"
 *    		},
 *    		{
 *    			"credential_default_for_type": true,
 *    			"user_id": "c2691d4d039040be96c190a949d754a7",
 *    			"credential_private": "************240aef",
 *    			"credential_type": "zencoder",
 *    			"credential_label": "alive-zencoder",
 *    			"credential_id": "bc303a92793249dcb759a114dbbfe7c2",
 *    			"credential_public": "Credentials for Zencoder"
 *    		}
 *    	]
 *    }
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Create  Credential

/**
 * @api {post} /v1/credentials Create Credential
 * @apiName Create Credential
 * @apiGroup Credentials
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a new credential.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Request Body Fields) {String} user_id GUID for which the credentials are being created.
 * @apiParam (Request Body Fields) {Boolean} credential_default_for_type Whether these are the default credentials for the request type
 * @apiParam (Request Body Fields) {String} credential_label Label for the credential
 * @apiParam (Request Body Fields) {String="ftp","oauth","s3","videocloud","zencoder"} credential_type The credential type
 * @apiParam (Request Body Fields) {String} credential_private Private key or password depending on the type
 * @apiParam (Request Body Fields) {String} credential_public Public key or password depending on the type
 * @apiParam (Request Body Fields) {Object} [oauth_settings]  OAuth settings for OAuth credentials needed to send notifications to a notification URL **Required for oauth type credentials**
 * @apiParam (Request Body Fields) {Object} oauth_settings.url  OAuth access token URL for OAuth credentials needed to send notifications to a notification URL
 *
 * @apiParamExample {object} Create a OAuth Credential for Notifications Request Body Example:
 *    {
 *    	"user_id": {{ user_id  }},
 *    	"credential_default_for_type": true,
 *    	"credential_label": "oauth-credential",
 *    	"credential_type": "oauth",
 *      "credential_public": "3e23bbec-59b8-4861-b5ba-7c26e110a746",
 *    	"credential_private": "Nil7Md7VpQ50A3KVV4eeMrZSR7FdeZA_3JS5jV9pBBI0skwWA",
 *        "oauth_settings": {
 *            "url": "https://oauth.brightcove.com/v4/access_token"
 *        }
 *    }
 *
 * @apiSuccess (200) {String} credential_id The credential id
 * @apiSuccess (200) {String} user_id The user id
 * @apiSuccess (200) {String} user_id The user id
 *
 * @apiSuccessExample {Object}
 *   HTTP/1.1 200 OK
 *    {
 *    	"credential_id": "2fc6b698ce264db3900375a4694607a6",
 *    	"user_id": "c2691d4d039040be96c190a949d754a7",
 *    	"credential_label": "videocloud-credential"
 *    }
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 */


// Update  Credential

/**
 * @api {put} /v1/credentials/{credential_id} Update Credential
 * @apiName Update Credential
 * @apiGroup Credentials
 * @apiVersion 1.0.0
 *
 * @apiDescription Update a credential.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 * @apiParam (Path) {string} credential_id The credential id
 *
 * @apiParam (Request Body Fields) {String} user_id GUID for which the credentials are being created.
 * @apiParam (Request Body Fields) {Boolean} credential_default_for_type Whether these are the default credentials for the request type
 * @apiParam (Request Body Fields) {String} credential_label Label for the credential
 * @apiParam (Request Body Fields) {String="ftp","oauth","s3","videocloud","zencoder"} credential_type The credential type
 * @apiParam (Request Body Fields) {String} credential_private Private key or password depending on the type
 * @apiParam (Request Body Fields) {String} credential_public Public key or password depending on the type
 * @apiParam (Request Body Fields) {Object} [oauth_settings]  OAuth settings for OAuth credentials needed to send notifications to a notification URL **Required for oauth type credentials**
 * @apiParam (Request Body Fields) {Object} oauth_settings.url  OAuth access token URL for OAuth credentials needed to send notifications to a notification URL
 *
 * @apiParamExample {object} Create a OAuth Credential for Notifications Request Body Example:
 *    {
 *    	"user_id": {{ user_id  }},
 *    	"credential_default_for_type": true,
 *    	"credential_label": "oauth-credential",
 *    	"credential_type": "oauth",
 *      "credential_public": "3e23bbec-59b8-4861-b5ba-7c26e110a746",
 *    	"credential_private": "Nil7Md7VpQ50A3KVV4eeMrZSR7FdeZA_3JS5jV9pBBI0skwWA",
 *        "oauth_settings": {
 *            "url": "https://oauth.brightcove.com/v4/access_token"
 *        }
 *    }
 * @apiSuccess (200) {String} credential_id The credential id
 * @apiSuccess (200) {String} user_id The user id
 * @apiSuccess (200) {String} user_id The user id
 *
 * @apiSuccessExample {Object}
 *   HTTP/1.1 200 OK
 *    {
 *    	"credential_id": "2fc6b698ce264db3900375a4694607a6",
 *    	"user_id": "c2691d4d039040be96c190a949d754a7",
 *    	"credential_label": "videocloud-credential"
 *    }
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 */


// Delete  Credential

/**
 * @api {delete} /v1/credentials/{credential_id} Delete Credential
 * @apiName Delete Credential
 * @apiGroup Credentials
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete a credential.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 * @apiParam (Path) {string} credential_id The credential id
 *
 * @apiSuccessExample {null}
 *    HTTP/1.1 204 NO_CONTENT
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 */
