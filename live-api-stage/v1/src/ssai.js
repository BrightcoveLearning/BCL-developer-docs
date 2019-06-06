// Create an Ad application_ad_configuration

/**
 * @api {post} /v1/ssai/applications Create Ad Configuration
 * @apiName Create Ad Configuration
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a configuration for server-side ad application.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Request Body Fields) {Object} application_ad_configuration The ad configuration object
 * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_description Human readable description of the configuration.
 * @apiParam (Request Body Fields) {String="Dfp","Vast","SmartXML"} application_ad_configuration.ad_configuration_expected_response_type The expected response type based on your ad server
 * @apiParam (Request Body Fields) {Object} [application_ad_configuration.ad_configuration_headers] An optional JSON object that can contain zero or more key-value-pairs, for which both key and value must be strings.  All of the standard URL substitutions are valid for headers.
 * @apiParam (Request Body Fields) {Boolean} [application_ad_configuration.ad_configuration_headers_for_impressions=true] If true, this configuration will send headers on all ad requests **and** impressions; if false, headers will not be sent on impressions (quartiles/impressions that we fire for tracking from an ad response).
 * @apiParam (Request Body Fields) {String="SingleAdResponse","MultipleAdResponse"} application_ad_configuration.ad_configuration_strategy Specifies whether ad breaks should include single or muliple ads
 * @apiParam (Request Body Fields) {Object[]} application_ad_configuration.ad_configuration_transforms Array of ad configuration transforms.
 * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_transforms.xpath xpath for the transform.
 * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_transforms.xslt xslt stylesheet for the transform.
 * @apiParam (Request Body Fields) {String} ad_configuration_url_format Format for the ad tag - see [SSAI Using the Brightcove Live API](https://support.brightcove.com/server-side-ad-insertion-using-brightcove-live-api#ad_configuration_variables) for the available ad configuration variables.
 * @apiParam (Request Body Fields) {String} application_description Human readable description of the ad application.
 * @apiParam (Request Body Fields) {String} [account_id] Your Live account id (if you leave this blank, the request will still work)
 *
 * @apiParamExample {object} Create an ad configuration (single ad response) example:
 *    {
 *        "application_ad_configuration": {
 *            "ad_configuration_description": "Human readable description of the configuration",
 *            "ad_configuration_expected_response_type": "Vast",
 *            "ad_configuration_headers": {
 *                "X-Custom-Header-Rand": "{{random.int32}}",
 *                "X-VIDEOPLAZA-FORWARDED-FOR": "{{client.ipaddress}}"
 *            },
 *            "ad_configuration_strategy": "SingleAdResponse",
 *            "ad_configuration_transforms": [
 *            {
 *                "xpath": "/",
 *                "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>"
 *            }],
 *            "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}"
 *        },
 *        "application_description": "Human readable description of the ad application",
 *        "account_id": "USER'S ACCOUNT ID"
 *    }
 *
 * @apiParamExample {object} Create an ad configuration (multiple ad response) example:
 *    {
 *        "application_ad_configuration": {
 *            "ad_configuration_description": "Human readable description of the configuration",
 *            "ad_configuration_expected_response_type": "Vast",
 *            "ad_configuration_headers": {
 *                "X-Custom-Header-Rand": "{{random.int32}}",
 *                "X-VIDEOPLAZA-FORWARDED-FOR": "{{client.ipaddress}}"
 *            },
 *            "ad_configuration_strategy": "MultipleAdResponse",
 *            "ad_configuration_transforms": [
 *            {
 *                "xpath": "/",
 *                "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>"
 *            }],
 *            "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}"
 *        },
 *        "application_description": "Human readable description of the ad application",
 *        "account_id": "USER'S ACCOUNT ID"
 *    }
 *
 * @apiSuccess (200) {Object} application The ad application object
 * @apiSuccess (200) {String} application.account_id The Live account id
 * @apiSuccess (200) {String} application.description The ad application description
 * @apiSuccess (200) {Object} application.application_ad_configuration The ad configuration object for the application
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_description The ad configuration description
 * @apiSuccess (200) {String} application.application_ad_configuration.response_type The ad configuration response type (`Dfp`, `Vast`, or `SmartXML`)
 * @apiSuccess (200) {Object} application.application_ad_configuration.headers The ad configuration headers
 * @apiSuccess (200) {Boolean} application_ad_configuration.ad_configuration_headers_for_impressions If true, this configuration will send headers on all ad requests **and** impressions; if false, headers will not be sent on impressions (quartiles/impressions that we fire for tracking from an ad response).
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_strategy The ad configuration strategy (`SingleAdResponse`, or `MultipleAdResponse`)
 * @apiSuccess (200) {Object[]} application.application_ad_configuration.ad_configuration_transforms The ad configuration transforms
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xpath The ad configuration transform xpath
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xslt The ad configuration transform xslt
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_url_format The URL template for the ad server
 * @apiSuccess (200) {Object} application.application_ad_configuration.ad_configuration_variables Key/value pairs for the ad server URL template
 * @apiSuccess (200) {String} application.application_id The ad application id
 * @apiSuccess (200) {Boolean} inserted Whether the ad application was successfully inserted
 *
 * @apiSuccessExample {object} Success response for create ad application
 *    HTTP/1.1 200 OK
 *    {
 *      "application": {
 *        "account_id": "USER ACCOUNT ID",
 *        "application_description": "Human readable description of the ad application",
 *        "application_ad_configuration": {
 *          "ad_configuration_description": "Human readable description of the configuration",
 *          "ad_configuration_expected_response_type": "Vast",
 *          "ad_configuration_headers": {
 *                "X-Custom-Header-Rand": "{{random.int32}}",
 *                "X-VIDEOPLAZA-FORWARDED-FOR": "{{client.ipaddress}}"
 *          },
 *          "ad_configuration_headers_for_impressions": false,
 *          "ad_configuration_strategy": "SingleAdResponse",
 *          "ad_configuration_transforms": [
 *            {
 *              "xpath": "/",
 *              "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>"
 *            }
 *          ],
 *          "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}"
 *        },
 *        "application_id": "APPLICATION ID"
 *      },
 *      "inserted": true
 *    }
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (400) {object} BAD_REQUEST: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Update an Ad application_ad_configuration

/**
 * @api {put} /v1/ssai/applications/application/{application_id} Update Ad Configuration
 * @apiName Update Ad Configuration
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Update a configuration for server-side ad application.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} application_id The ad application id
 * @apiParam (Request Body Fields) {Object} application_ad_configuration The ad configuration object
 * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_description Human readable description of the configuration.
 * @apiParam (Request Body Fields) {String="Dfp","Vast","SmartXML"} application_ad_configuration.ad_configuration_expected_response_type The expected response type based on your ad server
 * @apiParam (Request Body Fields) {Object} [application_ad_configuration.ad_configuration_headers] An optional JSON object that can contain zero or more key-value-pairs, for which both key and value must be strings.  All of the standard URL substitutions are valid for headers.
 * @apiParam (Request Body Fields) {Boolean} [application_ad_configuration.ad_configuration_headers_for_impressions=true] If true, this configuration will send headers on all ad requests **and** impressions; if false, headers will not be sent on impressions (quartiles/impressions that we fire for tracking from an ad response).
 * @apiParam (Request Body Fields) {String="SingleAdResponse","MultipleAdResponse"} application_ad_configuration.ad_configuration_strategy Specifies whether ad breaks should include single or muliple ads
 * @apiParam (Request Body Fields) {Object[]} application_ad_configuration.ad_configuration_transforms Array of ad configuration transforms.
 * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_transforms.xpath xpath for the transform.
 * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_transforms.xslt xslt stylesheet for the transform.
 * @apiParam (Request Body Fields) {String} ad_configuration_url_format Format for the ad tag - see [SSAI Using the Brightcove Live API](https://support.brightcove.com/server-side-ad-insertion-using-brightcove-live-api#ad_configuration_variables) for the available ad configuration variables.
 * @apiParam (Request Body Fields) {String} application_description Human readable description of the ad application.
 * @apiParam (Request Body Fields) {String} [account_id] Your Live account id (if you leave this blank, the request will still work)
 *
 * @apiParamExample {object} Update an ad configuration (single ad response) example:
 *    {
 *        "application_ad_configuration": {
 *            "ad_configuration_description": "Human readable description of the configuration",
 *            "ad_configuration_expected_response_type": "Dfp",
 *            "ad_configuration_headers": {
 *                "X-Custom-Header-Rand": "{{random.int32}}",
 *                "X-VIDEOPLAZA-FORWARDED-FOR": "{{client.ipaddress}}"
 *            },
 *            "ad_configuration_strategy": "SingleAdResponse",
 *            "ad_configuration_transforms": [
 *            {
 *                "xpath": "/",
 *                "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>"
 *            }],
 *            "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}"
 *        },
 *        "application_description": "Human readable description of the ad application",
 *        "account_id": "USER'S ACCOUNT ID"
 *    }
 *
 * @apiParamExample {object} Update an ad configuration (multiple ad response) example:
 *    {
 *        "application_ad_configuration": {
 *            "ad_configuration_description": "Human readable description of the configuration",
 *            "ad_configuration_expected_response_type": "Dfp",
 *            "ad_configuration_headers": {
 *                "X-Custom-Header-Rand": "{{random.int32}}",
 *                "X-VIDEOPLAZA-FORWARDED-FOR": "{{client.ipaddress}}"
 *            },
 *            "ad_configuration_headers_for_impressions": false,
 *            "ad_configuration_strategy": "MultipleAdResponse",
 *            "ad_configuration_transforms": [
 *            {
 *                "xpath": "/",
 *                "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>"
 *            }],
 *            "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}"
 *        },
 *        "application_description": "Human readable description of the ad application",
 *        "account_id": "USER'S ACCOUNT ID"
 *    }
 *
 * @apiSuccess (200) {Object} application The ad application object
 * @apiSuccess (200) {String} application.account_id The Live account id
 * @apiSuccess (200) {String} application.description The ad application description
 * @apiSuccess (200) {Object} application.application_ad_configuration The ad configuration object for the application
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_description The ad configuration description
 * @apiSuccess (200) {String} application.application_ad_configuration.response_type The ad configuration response type (`Dfp`, `Vast`, or `SmartXML`)
 * @apiSuccess (200) {Object} application.application_ad_configuration.headers The ad configuration headers
 * @apiSuccess (200) {Boolean} application_ad_configuration.ad_configuration_headers_for_impressions If true, this configuration will send headers on all ad requests **and** impressions; if false, headers will not be sent on impressions (quartiles/impressions that we fire for tracking from an ad response).
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_strategy The ad configuration strategy (`SingleAdResponse`, or `MultipleAdResponse`)
 * @apiSuccess (200) {Object[]} application.application_ad_configuration.ad_configuration_transforms The ad configuration transforms
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xpath The ad configuration transform xpath
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xslt The ad configuration transform xslt
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_url_format The URL template for the ad server
 * @apiSuccess (200) {Object} application.application_ad_configuration.ad_configuration_variables Key/value pairs for the ad server URL template
 * @apiSuccess (200) {String} application.application_id The ad application id
 * @apiSuccess (200) {Boolean} inserted Whether the ad application was successfully inserted
 *
 * @apiSuccessExample {object} Success response for create ad application
 *    HTTP/1.1 200 OK
 *    {
 *      "application": {
 *        "account_id": "USER ACCOUNT ID",
 *        "application_description": "Human readable description of the ad application",
 *        "application_ad_configuration": {
 *          "ad_configuration_description": "Human readable description of the configuration",
 *          "ad_configuration_expected_response_type": "Dfp,
 *          "ad_configuration_headers": {
 *                "X-Custom-Header-Rand": "{{random.int32}}",
 *                "X-VIDEOPLAZA-FORWARDED-FOR": "{{client.ipaddress}}"
 *          },
 *          "ad_configuration_headers_for_impressions": false,
 *          "ad_configuration_strategy": "SingleAdResponse/MultipleAdResponse",
 *          "ad_configuration_transforms": [
 *            {
 *              "xpath": "/",
 *              "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>"
 *            }
 *          ],
 *          "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}"
 *        },
 *        "application_id": "APPLICATION ID"
 *      },
 *      "inserted": true
 *    }
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (400) {object} BAD_REQUEST: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Get Ad application_ad_configurations

/**
 * @api {get} /v1/ssai/applications/account/{account_id} Get Account Ad Configurations
 * @apiName Get Account Ad Configurations
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Get ad applications for an account.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {string} account_id The Live account id
 *
 * @apiSuccess (200) {Object} application The ad application object
 * @apiSuccess (200) {String} application.account_id The account id
 * @apiSuccess (200) {String} application.description The ad application description
 * @apiSuccess (200) {Object} application.application_ad_configuration The ad configuration object for the application
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_description The ad configuration description
 * @apiSuccess (200) {String} application.application_ad_configuration.response_type The ad configuration response type (`Dfp`, `Vast`, or `SmartXML`)
 * @apiSuccess (200) {Object} application.application_ad_configuration.headers The ad configuration headers
 * @apiSuccess (200) {Boolean} application_ad_configuration.ad_configuration_headers_for_impressions If true, this configuration will send headers on all ad requests **and** impressions; if false, headers will not be sent on impressions (quartiles/impressions that we fire for tracking from an ad response).
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_strategy The ad configuration strategy (`SingleAdResponse`, or `MultipleAdResponse`)
 * @apiSuccess (200) {Object[]} application.application_ad_configuration.ad_configuration_transforms The ad configuration transforms
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xpath The ad configuration transform xpath
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xslt The ad configuration transform xslt
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_url_format The URL template for the ad server
 * @apiSuccess (200) {Object} application.application_ad_configuration.ad_configuration_variables Key/value pairs for the ad server URL template
 * @apiSuccess (200) {String} application.application_id The ad application id
 * @apiSuccess (200) {Boolean} inserted Whether the ad application was successfully inserted
 *
 * @apiSuccessExample {object} Success response Get Ad Applications
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "application_id": "APPLICATION_ID_1",
 *        "application_description": "DFP Single Midroll",
 *        "application_ad_configuration": {
 *          "ad_configuration_description": "DFP Test Config Single Midroll",
 *          "ad_configuration_strategy": "MultipleAdResponse",
 *          "ad_configuration_transforms": [],
 *          "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler",
 *          "ad_configuration_expected_response_type": "Dfp"
 *        },
 *        "account_id": "account_id"
 *      },
 *      {
 *        "application_id": "APPLICATION_ID_2",
 *        "application_description": "Test DFP Single Midroll"
 *        "application_ad_configuration": {
 *          "ad_configuration_description": "DFP Test Config Single Midroll",
 *          "ad_configuration_strategy": "MultipleAdResponse",
 *          "ad_configuration_transforms": [
 *            {
 *              "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>",
 *              "xpath": "/"
 *            }
 *          ],
 *          "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}",
 *          "ad_configuration_expected_response_type": "Dfp"
 *        },
 *        "account_id": "account_id"
 *      }
 *    ]
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Get Ad application_ad_configurations

/**
 * @api {get} /v1/ssai/applications Get Ad Configurations for User
 * @apiName Get Ad Configurations for User
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Get ad applications for the current user.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 *
 * @apiSuccess (200) {Object} application The ad application object
 * @apiSuccess (200) {String} application.account_id The account id
 * @apiSuccess (200) {String} application.description The ad application description
 * @apiSuccess (200) {Object} application.application_ad_configuration The ad configuration object for the application
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_description The ad configuration description
 * @apiSuccess (200) {String} application.application_ad_configuration.response_type The ad configuration response type (`Dfp`, `Vast`, or `SmartXML`)
 * @apiSuccess (200) {Object} application.application_ad_configuration.headers The ad configuration headers
 * @apiSuccess (200) {Boolean} application_ad_configuration.ad_configuration_headers_for_impressions If true, this configuration will send headers on all ad requests **and** impressions; if false, headers will not be sent on impressions (quartiles/impressions that we fire for tracking from an ad response).
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_strategy The ad configuration strategy (`SingleAdResponse`, or `MultipleAdResponse`)
 * @apiSuccess (200) {Object[]} application.application_ad_configuration.ad_configuration_transforms The ad configuration transforms
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xpath The ad configuration transform xpath
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xslt The ad configuration transform xslt
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_url_format The URL template for the ad server
 * @apiSuccess (200) {Object} application.application_ad_configuration.ad_configuration_variables Key/value pairs for the ad server URL template
 * @apiSuccess (200) {String} application.application_id The ad application id
 * @apiSuccess (200) {Boolean} inserted Whether the ad application was successfully inserted
 *
 * @apiSuccessExample {object} Success response Get Ad Applications
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "application_id": "APPLICATION_ID_1",
 *        "application_description": "DFP Single Midroll",
 *        "application_ad_configuration": {
 *          "ad_configuration_description": "DFP Test Config Single Midroll",
 *          "ad_configuration_strategy": "MultipleAdResponse",
 *          "ad_configuration_transforms": [],
 *          "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler",
 *          "ad_configuration_expected_response_type": "Dfp"
 *        },
 *        "account_id": "account_id"
 *      },
 *      {
 *        "application_id": "APPLICATION_ID_2",
 *        "application_description": "Test DFP Single Midroll"
 *        "application_ad_configuration": {
 *          "ad_configuration_description": "DFP Test Config Single Midroll",
 *          "ad_configuration_strategy": "MultipleAdResponse",
 *          "ad_configuration_transforms": [
 *            {
 *              "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>",
 *              "xpath": "/"
 *            }
 *          ],
 *          "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}",
 *          "ad_configuration_expected_response_type": "Dfp"
 *        },
 *        "account_id": "account_id"
 *      }
 *    ]
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Get an Ad application_ad_configuration

/**
 * @api {get} /v1/ssai/applications/application/{application_id} Get Ad Configuration
 * @apiName Get Ad Configuration
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Get an ad application.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} application_id The ad application id
 *
 *
 * @apiSuccess (200) {Object} application The ad application object
 * @apiSuccess (200) {String} application.account_id The account id
 * @apiSuccess (200) {String} application.description The ad application description
 * @apiSuccess (200) {Object} application.application_ad_configuration The ad configuration object for the application
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_description The ad configuration description
 * @apiSuccess (200) {String} application.application_ad_configuration.response_type The ad configuration response type (`Dfp`, `Vast`, or `SmartXML`)
 * @apiSuccess (200) {Object} application.application_ad_configuration.headers The ad configuration headers
 * @apiSuccess (200) {Boolean} application_ad_configuration.ad_configuration_headers_for_impressions If true, this configuration will send headers on all ad requests **and** impressions; if false, headers will not be sent on impressions (quartiles/impressions that we fire for tracking from an ad response).
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_strategy The ad configuration strategy (`SingleAdResponse`, or `MultipleAdResponse`)
 * @apiSuccess (200) {Object[]} application.application_ad_configuration.ad_configuration_transforms The ad configuration transforms
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xpath The ad configuration transform xpath
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_transforms.xslt The ad configuration transform xslt
 * @apiSuccess (200) {String} application.application_ad_configuration.ad_configuration_url_format The URL template for the ad server
 * @apiSuccess (200) {Object} application.application_ad_configuration.ad_configuration_variables Key/value pairs for the ad server URL template
 * @apiSuccess (200) {String} application.application_id The ad application id
 * @apiSuccess (200) {Boolean} inserted Whether the ad application was successfully inserted
 *
 * @apiSuccessExample {object} Success response for Get an Ad APPLICATION
 *    HTTP/1.1 200 OK
 *    {
 *      "application_id": "APPLICATION_ID",
 *      "application_description": "Test DFP Single Midroll",
 *      "application_ad_configuration": {
 *        "ad_configuration_description": "DFP Test Config Single Midroll",
 *        "ad_configuration_strategy": "MultipleAdResponse",
 *        "ad_configuration_transforms": [
 *          {
 *            "xslt": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:Det=\"http://Det.com\"><xsl:output omit-xml-declaration=\"yes\"/><xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template></xsl:stylesheet>",
 *            "xpath": "/"
 *          }
 *        ],
 *        "ad_configuration_url_format": "https://ad-provider-host.com/path/to/ad-handler?ip={{client.ipaddress}}&num={{random.int32}}&ses={{session.session_id}}",
 *        "ad_configuration_expected_response_type": "Dfp"
 *      },
 *      "account_id": "account_id"
 *    }
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Delete an ad application

/**
 * @api {delete} /v1/ssai/applications/application/{application_id} Delete Ad Configuration
 * @apiName Delete Ad Configuration
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete an ad application.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} application_id The ad application id
 *
 *
 * @apiSuccess (200) {String} application_id The ad application id
 * @apiSuccess (200) {Boolean} deleted Confirmation of deletion
 *
 * @apiSuccessExample {object} Success response for create ad application
 *    HTTP/1.1 200 OK
 *    {
 *      "application_id": "APPLICATION_ID",
 *      "deleted": true
 *    }
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 */

// Ingest Slate Media Source Asset

/**
 * @api {post} /v1/ssai/slates Ingest Slate Media Source Asset
 * @apiName Ingest Slate Media Source Asset
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Ingest Slate Media Source Asset.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Request Body Fields) {String} source_url URL for the slate to ingest
 * @apiParam (Request Body Fields) {String} account_id The Live account id (if left blank, the request will still work)
 * @apiParam (Request Body Fields) {String} [source_description] User identifiable description for the slate
 *
 * @apiParamExample {object} Ingest Slate Media Source Asset example:
 *    {
 *        "source_url": "https://somesourceasset.com/slate-to-ingest.mp4",
 *        "account_id": "account_id",
 *        "source_description": "User identifiable description for the slate"
 *    }
 *
 *
 * @apiSuccess (200) {String} media_source_asset_id Id for the slate asset
 * @apiSuccess (200) {String} account_id Id for the account
 * @apiSuccess (200) {String} media_source_asset_description User identifiable description for the slate
 * @apiSuccess (200) {Boolean} media_source_asset_default Whether this is the default media source asset
 * @apiSuccess (200) {String} media_source_asset_type The media asset type
 * @apiSuccess (200) {String} media_source_asset_url URL for the media asset to be ingested
 * @apiSuccess (200) {String} media_source_asset_status Current status of the ingestion of the media asset
 *
 * @apiSuccessExample {json} Success response for ingest slate media resource
 *    HTTP/1.1 200 OK
 *    {
 *      "media_source_asset_id": "NEW_UUID",
 *      "account_id": "account_id",
 *      "media_source_asset_default": false,
 *      "media_source_asset_type": "slate",
 *      "media_source_asset_url": "https://somesourceasset.com/slate-to-ingest.mp4",
 *      "media_source_asset_status": "transcoding"
 *      "media_source_asset_description": "User identifiable description for the slate"
 *    }
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (400) {object} BAD_REQUEST: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Delete Slate Media Source Asset

/**
 * @api {delete} /v1/ssai/slates/slate/{slate_msa_id} Delete Slate Media Source Asset
 * @apiName Delete Slate Media Source Asset
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete Slate Media Source Asset.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} slate_msa_id The id for the Slate media source asset
 *
 * @apiSuccess (200) {String} media_source_asset_id Id for the slate asset
 * @apiSuccess (200) {String} account_id Id for the account
 * @apiSuccess (200) {Boolean} media_source_asset_default Whether this is the default media source asset
 * @apiSuccess (200) {String} media_source_asset_type The media asset type
 * @apiSuccess (200) {String} media_source_asset_url URL for the media asset to be ingested
 * @apiSuccess (200) {String} media_source_asset_status Current status of the ingestion of the media asset
 *
 * @apiSuccessExample {object} Success response for delete media source asset
 *    {
 *      "media_source_asset_id": "MSA_UUID",
 *      "media_source_asset_type": "slate",
 *      "media_source_asset_url": "http://someS3urlpath/media.mp4",
 *      "media_source_asset_default": false,
 *      "media_source_asset_status": "ready",
 *      "account_id": "account_id"
 *    }
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Get Slate Media Source Assets

/**
 * @api {get} /v1/ssai/slates/account/{account_id} Get Slate Media Source Assets
 * @apiName Get Slate Media Source Assets
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Get Slate Media Source Assets for an account.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} account_id The account id.
 *
 * @apiSuccess (200) {String} media_source_asset_id Id for the slate asset
 * @apiSuccess (200) {String} account_id Id for the account
 * @apiSuccess (200) {String} media_source_asset_description User identifiable description for the slate
 * @apiSuccess (200) {Boolean} media_source_asset_default Whether this is the default media source asset
 * @apiSuccess (200) {String} media_source_asset_type The media asset type
 * @apiSuccess (200) {String} media_source_asset_url URL for the media asset to be ingested
 * @apiSuccess (200) {String} media_source_asset_status Current status of the ingestion of the media asset
 *
 * @apiSuccessExample {Object[]} Success response for Get Slate Media Source Assets
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "media_source_asset_id": "MSA_UUID_1",
 *        "media_source_asset_type": "slate",
 *        "media_source_asset_default": false,
 *        "media_source_asset_url": "http://someS3urlpath.com/media.mp4",
 *        "account_id": "account_id",
 *        "media_source_asset_status": "ready"
 *      },
 *      {
 *        "media_source_asset_id": "MSA_UUID_2",
 *        "media_source_asset_type": "slate",
 *        "media_source_asset_default": true,
 *        "media_source_asset_url": "http://someS3urlpath.com/media.mp4",
 *        "account_id": "account_id",
 *        "media_source_asset_status": "ready"
 *      }
 *    ]
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Get Slate Media Source Assets for User

/**
 * @api {get} /v1/ssai/slates Get Slate Assets for User
 * @apiName Get Slate Assets for User
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Get Slate Media Source Assets for the current user.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiSuccess (200) {String} media_source_asset_id Id for the slate asset
 * @apiSuccess (200) {String} account_id Id for the account
 * @apiSuccess (200) {String} media_source_asset_description User identifiable description for the slate
 * @apiSuccess (200) {Boolean} media_source_asset_default Whether this is the default media source asset
 * @apiSuccess (200) {String} media_source_asset_type The media asset type
 * @apiSuccess (200) {String} media_source_asset_url URL for the media asset to be ingested
 * @apiSuccess (200) {String} media_source_asset_status Current status of the ingestion of the media asset
 *
 * @apiSuccessExample {Object[]} Success response for Get Slate Media Source Assets
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "media_source_asset_id": "MSA_UUID_1",
 *        "media_source_asset_type": "slate",
 *        "media_source_asset_default": false,
 *        "media_source_asset_url": "http://someS3urlpath.com/media.mp4",
 *        "account_id": "account_id",
 *        "media_source_asset_status": "ready"
 *      },
 *      {
 *        "media_source_asset_id": "MSA_UUID_2",
 *        "media_source_asset_type": "slate",
 *        "media_source_asset_default": true,
 *        "media_source_asset_url": "http://someS3urlpath.com/media.mp4",
 *        "account_id": "account_id",
 *        "media_source_asset_status": "ready"
 *      }
 *    ]
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Create a beacon set

/**
 * @api {post} /v1/ssai/beaconsets Create beacon set
 * @apiName Create beacon set
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Beacons are data points on playback sent to ad servers to track whether and how much of ads were played. Creates a beacon set.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Request Body Fields) {String} [account_id] Account id
 * @apiParam (Request Body Fields) {Object[]} beacon_urls Array of beacon URLs
 * @apiParam (Request Body Fields) {String} beacon_urls.beacon_url URL format for the beacon - see ( https://support.brightcove.com/node/17763#Beacons) for the valid beacon variables
 * @apiParam (Request Body Fields) {String} beacon_urls.beacon_type the beacon type - see ( https://support.brightcove.com/node/17763#Beacons) for the valid beacon types
 *
 * @apiParamExample {json} Create beacon set example:
 *    {
 *        "account_id": "USER's ACCOUNT ID",
 *        "beacon_urls": [
 *            {
 *                "beacon_url": "https://myserver.com/beaconRX/{{job.job_id}}/load?position=load&sid={{session.session_id}}&jid={{job.job_id}}&app={{application_ad_configuration.description}}&rnd32={{random.int32}}&rnd64={{random.int64}}&bid={{random.uuid}}&t={{server.timestamputc}}&ua={{client.useragent}}&ip={{client.ipaddress}}&ref={{client.referrer}}&ref={{client.referer}}&ab={{live.adbreak}}&abd={{live.adbreakduration}}&abdi={{live.adbreakdurationint}}",
 *                "beacon_type": "Load"
 *            },
 *            {
 *                "beacon_url": "https://myserver.com/beaconRX/{{job.job_id}}/play?position=play&sid={{session.session_id}}&jid={{job.job_id}}&app={{application_ad_configuration.description}}&rnd32={{random.int32}}&rnd64={{random.int64}}&bid={{random.uuid}}&t={{server.timestamputc}}&ua={{client.useragent}}&ip={{client.ipaddress}}&ref={{client.referrer}}&ref={{client.referer}}&ab={{live.adbreak}}&abd={{live.adbreakduration}}&abdi={{live.adbreakdurationint}}",
 *                "beacon_type": "Play"
 *            }
 *        ]
 *    }
 *
 *
 * @apiSuccess (200) {Object} beacon_set The beacon set object
 * @apiSuccess (200) {Object[]} beacon_set.beacon_urls Array of beacon URLs
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_url Beacon URL
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_type Beacon type
 * @apiSuccess (200) {String} beacon_sets.beacon_set_id Id for the beacon set
 * @apiSuccess (200) {String} beacon_sets.account_id Id for the account
 * @apiSuccess (200) {Boolean} inserted Whether the beacon set was added successfully
 *
 * @apiSuccessExample {object} Success response for Get Slate Media Source Assets
 *    HTTP/1.1 200 OK
 *    {
 *        "beacon_set": {
 *            "beacon_urls": [{
 *                "beacon_url": "https://myserver.com/beaconRX/{{job.job_id}}/load?position=load&sid={{session.session_id}}&jid={{job.job_id}}&app={{application_ad_configuration.description}}&rnd32={{random.int32}}&rnd64={{random.int64}}&bid={{random.uuid}}&t={{server.timestamputc}}&ua={{client.useragent}}&ip={{client.ipaddress}}&ref={{client.referrer}}&ref={{client.referer}}&ab={{live.adbreak}}&abd={{live.adbreakduration}}&abdi={{live.adbreakdurationint}}",
 *                "beacon_type": "Load"
 *            },
 *            {
 *                "beacon_url": "https://myserver.com/beaconRX/{{job.job_id}}/play?position=play&sid={{session.session_id}}&jid={{job.job_id}}&app={{application_ad_configuration.description}}&rnd32={{random.int32}}&rnd64={{random.int64}}&bid={{random.uuid}}&t={{server.timestamputc}}&ua={{client.useragent}}&ip={{client.ipaddress}}&ref={{client.referrer}}&ref={{client.referer}}&ab={{live.adbreak}}&abd={{live.adbreakduration}}&abdi={{live.adbreakdurationint}}",
 *                "beacon_type": "Play"
 *            }],
 *            "beacon_set_id": "Inserted Beacon Set ID",
 *            "account_id": "USER's ACCOUNT ID"
 *        }
 *        "inserted": true
 *    }
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (400) {object} BAD_REQUEST: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Update a beacon set

/**
 * @api {put} /v1/ssai/beaconsets/beaconset/{beacon_set_id} Update beacon set
 * @apiName Update beacon set
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates a beacon set.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} beacon_set_id The id for the beacon set
 * @apiParam (Request Body Fields) {String} [account_id] URL for the slate to ingest
 * @apiParam (Request Body Fields) {Object[]} beacon_urls Array of beacon URLs
 * @apiParam (Request Body Fields) {String} beacon_urls.beacon_url URL format for the beacon - see ( https://support.brightcove.com/node/17763#Beacons) for the valid beacon variables
 * @apiParam (Request Body Fields) {String} beacon_urls.beacon_type the beacon type - see ( https://support.brightcove.com/node/17763#Beacons) for the valid beacon types
 *
 * @apiParamExample {object} Ingest Slate Media Source Asset example:
 *    {
 *        "account_id": "USER's ACCOUNT ID", [Optional - If omitted, the Account ID of the requesting user is used.]
 *        "beacon_urls": [
 *            {
 *                "beacon_url": "https://myserver.com/beaconRX/{{job.job_id}}/load?position=load&sid={{session.session_id}}&jid={{job.job_id}}&app={{application_ad_configuration.description}}&rnd32={{random.int32}}&rnd64={{random.int64}}&bid={{random.uuid}}&t={{server.timestamputc}}&ua={{client.useragent}}&ip={{client.ipaddress}}&ref={{client.referrer}}&ref={{client.referer}}&ab={{live.adbreak}}&abd={{live.adbreakduration}}&abdi={{live.adbreakdurationint}}",
 *                "beacon_type": "Load"
 *            },
 *            {
 *                "beacon_url": "https://myserver.com/beaconRX/{{job.job_id}}/play?position=play&sid={{session.session_id}}&jid={{job.job_id}}&app={{application_ad_configuration.description}}&rnd32={{random.int32}}&rnd64={{random.int64}}&bid={{random.uuid}}&t={{server.timestamputc}}&ua={{client.useragent}}&ip={{client.ipaddress}}&ref={{client.referrer}}&ref={{client.referer}}&ab={{live.adbreak}}&abd={{live.adbreakduration}}&abdi={{live.adbreakdurationint}}",
 *                "beacon_type": "Play"
 *            }
 *        ]
 *    }
 *
 *
 * @apiSuccess (200) {Object} beacon_set The beacon set object
 * @apiSuccess (200) {Object[]} beacon_set.beacon_urls Array of beacon URLs
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_url Beacon URL
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_type Beacon type
 * @apiSuccess (200) {String} beacon_sets.beacon_set_id Id for the beacon set
 * @apiSuccess (200) {String} beacon_sets.account_id Id for the account
 * @apiSuccess (200) {Boolean} inserted Whether the beacon set was added successfully
 *
 * @apiSuccessExample {json} Success response for Get Slate Media Source Assets
 *    HTTP/1.1 200 OK
 *    {
 *        "beacon_set": {
 *            "account_id": "USER's ACCOUNT ID",
 *            "beacon_set_id": "beacon_set_id",
 *            "beacon_urls": [{
 *                "beacon_url": "https://myserver.com/beaconRX/load",
 *                "beacon_type": "Load"
 *            },
 *            {
 *                "beacon_url": "https://myserver.com/beaconRX/play",
 *                "beacon_type": "Play"
 *            }],
 *            "updated_beacon_set": {
 *                "beacon_set_id": "beacon_set_id",
 *                "beacon_urls": [{
 *                    "beacon_url": "https://myserver.com/beaconRX/load",
 *                    "beacon_type": "Load"
 *                },
 *                {
 *                    "beacon_url": "https://myserver.com/beaconRX/play",
 *                    "beacon_type": "Play"
 *                }],
 *                "account_id": "USER's ACCOUNT ID"
 *            }
 *        }
 *    }
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (400) {object} BAD_REQUEST: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */

// Get beacon sets

/**
 * @api {get} /v1/ssai/beaconsets/account/{account_id} Get beacon sets
 * @apiName Get beacon sets
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Get all beacon sets for an account.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} account_id The account id
 *
 * @apiSuccess (200) {Object} beacon_set The beacon set object
 * @apiSuccess (200) {Object[]} beacon_set.beacon_urls Array of beacon URLs
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_url Beacon URL
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_type Beacon type
 * @apiSuccess (200) {String} beacon_sets.beacon_set_id Id for the beacon set
 * @apiSuccess (200) {String} beacon_sets.account_id Id for the account
 * @apiSuccess (200) {Boolean} inserted Whether the beacon set was added successfully
 *
 * @apiSuccessExample {json} Success response for Get Beacon Sets
 *    HTTP/1.1 200 OK
 *    [{
 *        "account_id": "USER's ACCOUNT ID",
 *        "beacon_set_id": "beacon_set_id_1",
 *        "beacon_urls": [{
 *            "beacon_url": "https://myserver.com/beaconRX/load",
 *            "beacon_type": "Load"
 *        }]
 *    },
 *    {
 *        "account_id": "USER's ACCOUNT ID",
 *        "beacon_set_id": "beacon_set_id_2",
 *        "beacon_urls": [{
 *           "beacon_url": "https://myserver.com/beaconRX2/load",
 *           "beacon_type": "Load"
 *        },
 *        {
 *           "beacon_url": "https://myserver.com/beaconRX2/play",
 *           "beacon_type": "Play"
 *        }]
 *    }]
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */


// Get beacon sets for user

/**
 * @api {get} /v1/ssai/beaconsets Get beacon sets for user
 * @apiName Get beacon sets for user
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Get all beacon sets for the requesting user.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 *
 *
 * @apiSuccess (200) {Object} beacon_set The beacon set object
 * @apiSuccess (200) {Object[]} beacon_set.beacon_urls Array of beacon URLs
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_url Beacon URL
 * @apiSuccess (200) {String} beacon_set.beacon_urls.beacon_type Beacon type
 * @apiSuccess (200) {String} beacon_sets.beacon_set_id Id for the beacon set
 * @apiSuccess (200) {String} beacon_sets.account_id Id for the account
 * @apiSuccess (200) {Boolean} inserted Whether the beacon set was added successfully
 *
 * @apiSuccessExample {json} Success response for Get Beacon Sets for user
 *    HTTP/1.1 200 OK
 *    [{
 *        "account_id": "USER's ACCOUNT ID",
 *        "beacon_set_id": "beacon_set_id_1",
 *        "beacon_urls": [{
 *            "beacon_url": "https://myserver.com/beaconRX/load",
 *            "beacon_type": "Load"
 *        }]
 *    },
 *    {
 *        "account_id": "USER's ACCOUNT ID",
 *        "beacon_set_id": "beacon_set_id_2",
 *        "beacon_urls": [{
 *           "beacon_url": "https://myserver.com/beaconRX2/load",
 *           "beacon_type": "Load"
 *        },
 *        {
 *           "beacon_url": "https://myserver.com/beaconRX2/play",
 *           "beacon_type": "Play"
 *        }]
 *    }]
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */



// Delete a beacon set

/**
 * @api {delete} /v1/ssai/beaconsets/{beacon_set_id} Delete beacon set
 * @apiName Delete beacon set
 * @apiGroup SSAI
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a beacon set.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Path) {String} beacon_set_id The id for the beacon set
 *
 * @apiSuccess (200) {String} beacon_set_id The beacon set id
 * @apiSuccess (200) {Boolean} deleted Whether the beacon set was deleted successfully
 *
 * @apiSuccessExample {json} Success response for Delete Beacon Set
 *    HTTP/1.1 200 OK
 *    {
 *      "beacon_set_id": "beacon_set_id",
 *      "deleted": true
 *    }
 *
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 *
 */
