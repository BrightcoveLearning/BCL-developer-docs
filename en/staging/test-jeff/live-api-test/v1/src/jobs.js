// Create a Standard Live Job

/**
 * @api {post} /v1/jobs Create a Live Job
 * @apiName Create a Live Job
 * @apiGroup Live_Jobs
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a live stream
 *
 * @apiHeader {String} Content-Type: application/json
 * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
 *
 * @apiParam (Request Body Fields) {Boolean} live_stream Indicates that the job is a live streaming job.
 * @apiParam (Request Body Fields) {String="24x7","event"} [channel_type=event] Indicates whether the job should be billed as event hours or a channel (`24x7`) - see [Channels and Event Hours ](https://support.brightcove.com/overview-brightcove-live-api#Channels_and_hours).
 * @apiParam (Request Body Fields) {Boolean} [ad_insertion=false] Setting this parameter to true will enable server side ad insertion (SSAI) on the job. Current support includes, DFP, Freewheel, or any VAST 2.0/3.0 ad tags.
 * @apiParam (Request Body Fields) {String="us-west-2","us-east-1","ap-southeast-2", "ap-northeast-1","ap-southeast-1", "eu-central-1", "eu-west-1", "sa-east-1"} region AWS region - you can also specify region as the alias for a list set up for the account by Brightcove Support. See [Supported AWS Regions] (https://support.brightcove.com/overview-brightcove-live-api#Support_aws_regions) for more details on the support in each region.
 * @apiParam (Request Body Fields) (String[]) [rtmp_ip_whitelist] Array of IP addresses whitelisted for RTMP delivery
 * @apiParam (Request Body Fields) {Number{-60.0-60.0}} [ad_audio_loudness_level] Adjust the loudness level of the audio. This is measured in LUFS and specified in dB. This is useful to set the output loudness level to conform to a standard (`-23dB` for **EBU R.128**) The recommended setting is `-23`.
 * @apiParam (Request Body Fields) {String} [beacon_set] ID for a beacon set (for SSAI only).
 * @apiParam (Request Body Fields) {Number{1-7200}} [reconnect_time=30] The time, in seconds, to wait for a stream to reconnect to the encoder. If the reconnect time passes without the stream reconnecting, the job will automatically finish.
 * @apiParam (Request Body Fields) {String} [slate] Id for a set of slate assets
 * @apiParam (Request Body Fields) {Boolean} [static=false] Whether this is a static entry point (SEP) job
 * @apiParam (Request Body Fields) {Object} [encryption] Encryption to apply to the stream.
 * @apiParam (Request Body Fields) {String="aes-128"} encryption.method The encryption method to use.
 * @apiParam (Request Body Fields) {String="internal","external"} encryption.type The encryption type, depending on whether an internal or external key server will be used.
 * @apiParam (Request Body Fields) {String} [encryption.key] The encryption key - either a key, passphrase, or key_rotation is required; if the type is external, key is required
 * @apiParam (Request Body Fields) {String} [encryption.passphrase] The encryption key  - either a key, passphrase, or key_rotation is required
 * @apiParam (Request Body Fields) {Boolean} [encryption.key_rotation=false] Whether to use key rotation  - either a key, passphrase, or key_rotation is required
 * @apiParam (Request Body Fields) {Number} [encryption.rotate_every=10] Interval for key rotation in video segments
 * @apiParam (Request Body Fields) {String} [encryption.external_url] The URL for the external encryption key - this field is required if you specify `type` as `external`, and the external key must match the `key` value
 * @apiParam (Request Body Fields) {Number{0-93600}} [event_length=0] Used to preset and define an end time for the live event. At any point within the specified `event_length` you may reconnect to your stream. The `event_length` setting goes into effect as soon as streaming begins.
 * @apiParam (Request Body Fields) {Boolean} [hls_endlist=true] Whether an `EXT-X-ENDLIST` tag should be added to the stream playlist when you stop the stream or the `reconnect_time` window has been reached. The `EXT-X-ENDLIST` tag indicates that no more Media Segments will be added to the Media Playlist file and helps prevent the player from displaying error messages when the stream stops.
 * @apiParam (Request Body Fields) {Number{1-86400}} [live_dvr_sliding_window_duration=100] The time, in seconds, to keep in the live DVR manifest. If the stream duration is longer than the window duration, segment references will be removed first in first out. Default is 100 seconds. **Note: for SSAI jobs, the limit is `7200`.
 * @apiParam (Request Body Fields) {Number{1-600}} [live_dvr_ads_window_duration=600] The time, in seconds, to keep in the live DVR manifest. If the stream duration is longer than the window duration, segment references will be removed first in first out. Default is 100 seconds.
 * @apiParam (Request Body Fields) {Number{1-5}} [max_hls_protocol_version=3] Sets the maximum HLS protocol version to use. Special features will be used as available. Default is 3.
 * @apiParam (Request Body Fields) {Array} [notifications] Array of notification destination objects or strings - notifications defined here are for **job-level events**.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiParam (Request Body Fields) {String} [notifications.event] Event to send the notification for.
 * @apiParam (Request Body Fields) {String} notifications.url Destination for the notification.
 * @apiParam (Request Body Fields) {String} [notifications.credentials] Credentials The name of the credentials configured in your account for this address
 * @apiParam (Request Body Fields) {String="first_segment_uploaded", "output_finished", "state_changed"} [notifications.event="state_changed"] Event type to send notifications for.  It is recommended to set events on the job and not individual rendition outputs since renditions will finish simultaneously.
 * @apiParam (Request Body Fields) {Object[]} [add_cdns] Array of additional CDN providers to be used for manifest generation. For each CDN provided, the manifest will be prepended accordingly
 * @apiParam (Request Body Fields) {String} add_cdns.label A label to identify the CDN.
 * @apiParam (Request Body Fields) {String} add_cdns.prepend CDN hostname to be prepended to addresses
 * @apiParam (Request Body Fields) {String="http","https"} add_cdns.protocol Protocol to use for the stream delivery
 * @apiParam (Request Body Fields) {String} add_cdns.vendor CDN vendor such as `akamai`
 * @apiParam (Request Body Fields) {Object} [add_cdns.token_auth] Token authentication details
 * @apiParam (Request Body Fields) {String} [add_cdns.token_auth.auth_type] Token authentication type - currently, the only supported value is `Akamai2.0`
 * @apiParam (Request Body Fields) {String} [add_cdns.token_auth.key] Your Akamai token auth password
 * @apiParam (Request Body Fields) {String{5..12}} [add_cdns.token_auth.token_name] Your Akamai token token name
 * @apiParam (Request Body Fields) {Object} [add_cdns.token_auth.media] Your Akamai token token name
 * @apiParam (Request Body Fields) {Mixed} [add_cdns.token_auth.media.start_time="now"] The time to apply token auth - `"now"` or epoch time in seconds
 * @apiParam (Request Body Fields) {Number} [add_cdns.token_auth.media.end_time] The time to end token auth, epoch time in seconds
 * @apiParam (Request Body Fields) {ttl} [add_cdns.token_auth.media.ttl] The time to live in seconds - either `end_time` or `ttl` is required
 * @apiParam (Request Body Fields) {Object[]} outputs Array of output specifications for live and VOD assets to be created from the live stream.
 * @apiParam (Request Body Fields) {String} outputs.label Label for the live or VOD asset.
 * @apiParam (Request Body Fields) {Boolean} outputs.live_stream For jobs, setting live_stream to true indicates the output is a live rendition. If `live_stream` is false, or is not set, the output will be treated as a VOD output.
 * @apiParam (Request Body Fields) {Number{0-172800}} [outputs.duration] Clipping API option 1. Duration (in seconds) to clip back from Live. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{-60.0-60.0}} [outputs.ad_audio_loudness_level] Adjust the loudness level of the audio. This is measured in LUFS and specified in dB. This is useful to set the output loudness level to conform to a standard (`-23dB` for **EBU R.128**) The recommended setting is `-23`.
 * @apiParam (Request Body Fields) {Number{0-2147483647}} [outputs.stream_start_time] Clipping API option 2. An offset, in seconds, from the start of the live stream to mark the beginning of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{stream_start_time-stream_start_time+172800}} [outputs.stream_end_time] Clipping API option 2. An offset, in seconds, from the start of the live stream to mark the end of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{current_time-future_time}} [outputs.start_time] Clipping API option 3. Universal epoch time, in seconds, to mark the beginning of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Number{start_time-start_time+172800}} [outputs.end_time] Clipping API option 3. Universal epoch time, in seconds, to mark the end of the clip. Note: Clipping API only requires one of the three options for specifying duration or time.
 * @apiParam (Request Body Fields) {Boolean} [outputs.copy_video] Specifying `copy_video` will take the video track from the input video file and transmux it into the resulting output file.
 * @apiParam (Request Body Fields) {Boolean} [outputs.copy_audio] Specifying `copy_audio` will take the audio track from the input video file and transmux it into the resulting output file.
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip_video] Specifying `skip_video` removes the video track.
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip_audio] Specifying `skip_audio` removes the audio track.
 * @apiParam (Request Body Fields) {Number} [outputs.width] Video frame width. If no width is supplied, we will use 640 pixels.
 * @apiParam (Request Body Fields) {Number} [outputs.height] Video frame height. If no height is supplied, we will use 480 pixels.
 * @apiParam (Request Body Fields) {String="h264"} [outputs.video_codec] The output video codec. Note: Only h264 is supported.
 * @apiParam (Request Body Fields) {String="baseline","main","high"} [outputs.h264_profile] H.264 has three commonly-used profiles: Baseline (lowest), Main, and High. Lower levels are easier to decode, but higher levels offer better compression. For the best compression quality, choose High. For playback on low-CPU machines or many mobile devices, choose Baseline.
 * @apiParam (Request Body Fields) {Number{1-6000}} outputs.keyframe_interval The maximum number of frames between each keyframe. If you set a low keyframe_interval it will increase the size / decrease the quality of your output file, but it will allow more precise scrubbing in most players. It’s recommended to have at least one keyframe per segment. If keyframe_interval is not provided, keyframes will follow the input GOP structure.
 * @apiParam (Request Body Fields) {Number{64-10000}} outputs.video_bitrate target video bitrate in kbps
 * @apiParam (Request Body Fields) {String="aac"} [outputs.audio_codec] The output audio codec to use. Note: Only aac is supported.
 * @apiParam (Request Body Fields) {Number{16-1024}} outputs.audio_bitrate An output bitrate setting for the audio track, in Kbps
 * @apiParam (Request Body Fields) {Number{2-20}} outputs.segment_seconds Sets the maximum duration of each segment in a segmented output.
 * @apiParam (Request Body Fields) {mixed[]} [outputs.notifications] Array of notification destination objects or strings - notifications defined here are **for events specific to the output**.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiParam (Request Body Fields) {String} outputs.notifications.url Destination for the notification.
 * @apiParam (Request Body Fields) {String} [outputs.notifications.event] Event to send the notification for.
 * @apiParam (Request Body Fields) {String} [outputs.notifications.credentials] Credentials The name of the credentials configured in your account for this address
 * @apiParam (Request Body Fields) {String} [outputs.rendition_label] Indicates what rendition to use to create a VOD output (from the live job) or which renditions to use. By default, the system uses any transmuxed rendition or the highest resolution output if there is no transmuxed output.
 * @apiParam (Request Body Fields) {String="playlist"} [outputs.type] The only type supported is a playlist. This is used for generating multiple master playlists with different renditions in the HLS manifest with the defined stream labels.
 * @apiParam (Request Body Fields) {Array} [outputs.streams] When creating a playlist, the streams field is used to define which output renditions (by label) should be included in the manifest. Example format [{"source": "1080p"}, {"source": "720p"}].
 * @apiParam (Request Body Fields) {String} [outputs.url] For VOD, URL is mandatory and sets the destination of the final asset destination. For access restricted origins, the credentials a can be passed along with the URL or stored within the Brightcove system. For Live, this is reserved for future use.
 * @apiParam (Request Body Fields) {String} [outputs.credentials] The name for credentials with private and public keys can be stored with Brightcove to avoid passing plain text on API requests. This is required if the S3 or FTP origins are restricted. If credentials are not provided, it will be assumed that the origin restrictions are set to public or credentials are passed along with the URL.
 * @apiParam (Request Body Fields) {Object} [outputs.videocloud] Video Cloud customer have the option to push their clips directly through Dynamic Ingest. Options "{"video": {"name"}, "ingest": { }". The video object will be sent to the CMS API and can include (description, tags, etc.). Note: the account_id and reference_id will be added automatically. If overriding the reference_id, ensure that the id does not already exist or the job will fail. For more information see: [CMS-API-CreateVideo](https://brightcovelearning.github.io/Brightcove-API-References/cms-api/v1/doc/index.html#api-videoGroup-Create_Video). The ingest object will be sent to the Dynamic Ingest API and can include (master, profile, poster, callbacks, etc). Note: the account_id and video_id are added automatically. For more information see: [DI-API-IngestVideo](https://brightcovelearning.github.io/Brightcove-API-References/dynamic-ingest-api/v1/doc/index.html#api-Ingest-Ingest_Media_Asset).
 * @apiParam (Request Body Fields) {Mixed[]} [outputs.notifications] Array of notification destination objects or strings.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiParam (Request Body Fields) {String} [outputs.notifications.event] Event to send the notification for.
 * @apiParam (Request Body Fields) {String} outputs.notifications.url Destination for the notification.
 *
 * @apiParamExample {object} Standard Live Stream Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "outputs": [
 *            {
 *                "label": "hls1080p",
 *                "live_stream": true,
 *                "width": 1920,
 *                "height": 1080,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 2400,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 1280,
 *                "height": 720,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {object} Live Stream Transmuxed Rendition Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "outputs": [
 *            {
 *                "label": "hls1080p transmux",
 *                "live_stream": true,
 *                "copy_video": true,
 *                "copy_audio": true,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "url":"s3://YOUR_BUCKET/live/20160403004644_test.mp4",
 *                "credentials": "YOUR_CREDENTIALS"
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {object} Live Stream with VOD Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6
 *            },
 *            {
 *                "url":"s3://YOUR_BUCKET/live/20160403004644_test.mp4",
 *                "credentials": "YOUR_CREDENTIALS"
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {object} Live Stream with VOD and Notifications Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "notifications": [
 *            "http://httpbin.org/post?liveStateChange",
 *            {
 *                "url": "http://httpbin.org/post?liveStarted",
 *                "event": "first_segment_uploaded"
 *            },
 *            {
 *                "url": "http://httpbin.org/post?liveFinished",
 *                "event": "output_finished"
 *            }],
 *        "outputs": [
 *        {
 *            "label": "hls720p",
 *            "live_stream": true,
 *            "height": 720,
 *            "video_bitrate": 2000,
 *            "segment_seconds": 6,
 *            "video_codec": "h264",
 *            "h264_profile": "high",
 *            "segment_seconds": 6
 *        },
 *        {
 *            "label": "hls360p",
 *            "live_stream": true,
 *            "height": 360,
 *            "video_bitrate": 650,
 *            "segment_seconds": 6
 *        },
 *        {
 *            "url":"s3://YOUR_BUCKET/path/filename.mp4",
 *            "credentials": "YOUR_CREDENTIALS",
 *            "notifications":    [{
 *                "url": "http://httpbin.org/post?vodStateChange"
 *            },
 *            {
 *                "url": "http://httpbin.org/post?vodFinished",
 *                "event": "output_finished"
 *            }]
 *        }]
 *    }
 *
 * @apiParamExample {object} Live Stream with Multiple Output Playlists Example:
 *   {
 *       "live_stream": true,
 *       "region": "my-region-list",
 *       "reconnect_time": 180,
 *       "outputs": [{
 *           "label": "hls1080p",
 *           "live_stream": true,
 *           "height": 1080,
 *           "video_bitrate": 3000,
 *           "segment_seconds": 6,
 *           "keyframe_interval": 90
 *       },{
 *           "label": "hls720p",
 *           "live_stream": true,
 *           "height": 720,
 *           "video_bitrate": 2000,
 *           "segment_seconds": 6,
 *           "keyframe_interval": 90
 *       },{
 *           "label": "AudioOnly",
 *           "live_stream": true,
 *           "skip_video": true
 *       },{
 *           "label": "playlistVideoALL",
 *           "type": "playlist",
 *           "streams": [{"source": "hls1080p"},{"source": "hls720p"}]
 *       },{
 *           "label": "playlistHIGH",
 *           "type": "playlist",
 *           "filename":"playlist-high.m3u8",
 *           "streams": [{"source": "hls1080p"}]
 *       },{
 *           "label": "playlistAudio",
 *           "type": "playlist",
 *           "filename":"playlist-audio.m3u8",
 *           "streams": [{"source": "AudioOnly"}]
 *       },{
 *           "url":"s3://YOUR_BUCKET/PATH/20160804104116_test.mp4",
 *           "credentials": "S3_CREDENTIALS"
 *       }]
 *    }
 *
 * @apiParamExample {object} Live Stream with a Multiple CDN Config Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 30,
 *        "add_cdns":[
 *            {
 *                "label": "akamai",
 *                "prepend": "akamai.playback.com/someApplication",
 *                "protocol": "http"
 *            },
 *            {
 *                "label": "level3_1",
 *                "prepend": "l3.playback.io/somPath/someApplication/someFolder",
 *                "protocol": "http"
 *            }
 *        ],
 *        "outputs": [
 *            {
 *                "label": "hls1",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls2",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 *
 *
 * @apiParamExample {object} Live Stream with SSAI and VOD output Example:
 *    {
 *            "ad_insertion": true,
 *            "live_stream": true,
 *            "region": "my-region-list",
 *            "reconnect_time": 180,
 *            "slate": "bbbff5ad67a94941be8cb987ba23049d",
 *            "notifications": [
 *                "http://httpbin.org/post"
 *            ],
 *            "add_cdns":[{
 *                "label": "akamai-test",
 *                "prepend": "vrnginx-useast.akamai.com",
 *                "protocol": "http"
 *            }],
 *            "outputs": [
 *                {
 *                    "label": "hls720p",
 *                    "live_stream": true,
 *                    "height": 720,
 *                    "video_bitrate": 2400,
 *                    "segment_seconds": 6,
 *                    "keyframe_interval": 90
 *                },{
 *                    "label": "hls480p",
 *                    "live_stream": true,
 *                    "height": 480,
 *                    "video_bitrate": 1000,
 *                    "segment_seconds": 6,
 *                    "keyframe_interval": 90
 *                }, {
 *                "url":"s3://YOUR_BUCKET/live/20160403004644_test.mp4",
 *                "credentials": "YOUR_CREDENTIALS"
 *            }]
 *    }
 *
 * @apiParamExample {object} Standard Live Stream with Internal Encryption Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "internal",
 *            "key":"01234567890123450123456789012345"
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {object} Standard Live Stream with Internal Encryption and Passphrase Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "internal",
 *            "passphrase": "SuperSecret
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {object} Standard Live Stream with Internal Encryption and Rotation Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "internal",
 *            "rotate_every": 5,
 *            "key_rotation": true,
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 * @apiParamExample {object} Standard Live Stream with External URL and Key Example:
 *    {
 *        "live_stream": true,
 *        "region": "my-region-list",
 *        "reconnect_time": 20,
 *        "encryption": {
 *            "method": "aes-128",
 *            "type": "external",
 *            "key": "01234567890123456789012345678901",
 *            "external_url": "https://myserver/mykey/a.key"
 *        }
 *        "outputs": [
 *            {
 *                "label": "hls720p",
 *                "live_stream": true,
 *                "width": 960,
 *                "height": 540,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 1843,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            },
 *            {
 *                "label": "hls480p",
 *                "live_stream": true,
 *                "width": 640,
 *                "height": 360,
 *                "video_codec": "h264",
 *                "h264_profile": "main",
 *                "video_bitrate": 819,
 *                "segment_seconds": 6,
 *                "keyframe_interval": 60
 *            }
 *        ]
 *    }
 *
 *
 * @apiSuccess (200) {String} id Id for the stream.
 * @apiSuccess (200) {String} stream_url The stream URL to add to your encoder configuration.
 * @apiSuccess (200) {String} stream_name The stream name to add to your encoder configuration.
 * @apiSuccess (200) {Object[]} outputs Details on each output rendition of the Live job.
 * @apiSuccess (200) {String} outputs.id The unique id for the rendition.
 * @apiSuccess (200) {String} outputs.playback_url Media HLS manifest for the specified rendition (non-SSAI).
 * @apiSuccess (200) {String} outputs.playback_url_dvr Media HLS manifest for the specified rendition (with DVR capability).
 * @apiSuccess (200) {String} outputs.playback_url_vod Media HLS manifest for the VOD version of the stream if one was specified in the job settings - note that the VOD will not be available until the live event has finished and the creation of the VOD is complete.
 * @apiSuccess (200) {String} outputs.playback_url_dvr Media HLS manifest with a configurable DVR window. Default 100 seconds (non-SSAI).
 * @apiSuccess (200) {String} outputs.playback_url_vod Media HLS manifest of the Live stream for the last 24 hours. (non-SSAI).
 * @apiSuccess (200) {Boolean} live_stream Indicates that the job is a live streaming job.
 * @apiSuccess (200) {Boolean} ad_insertion Setting this parameter to true will enable server side ad insertion (SSAI) on the job. Current support includes, DFP, Freewheel, or any VAST 2.0/3.0 ad tags.
 * @apiSuccess (200) {String} region You can specify an Amazon AWS region to use for encoding a job and we will process the job on servers in the region specified. It’s recommended to use the region closest to your encoder.
 * @apiSuccess (200) {Number} reconnect_time The time, in seconds, to wait for a stream to reconnect to the encoder. Default is set to 30 seconds.
 * @apiSuccess (200) {Number} event_length Used to preset and define an end time for the live event. At any point within the specified `event_length` you may reconnect to your stream. The `event_length` setting goes into effect as soon as streaming begins.
 * @apiSuccess (200) {Number} max_hls_protocol_version Sets the maximum HLS protocol version to use. Special features will be used as available. Default is 3.
 * @apiSuccess (200) {String} slate id for slate of assets to be included
 * @apiSuccess (200) {String} sep_state The current state of the job's SEP (static entry point) - possible values: 'waiting' 'pending_activation', 'activation_in_progress', 'ready', 'pending_deactivation', 'deactivation_in_progress', 'cancelled', 'finished'
 * @apiSuccess (200) {mixed[]} notifications Array of notification destination objects or strings.  A notification will be sent to the destination when selected event occurs. You can use a simple string with a url: "http://log:pass@httpbin.org/post", or you can use an object.
 * @apiSuccess (200) {String} notifications.url Destination for the notification.
 * @apiSuccess (200) {String} notifications.credentials Credentials for the destination, if required.
 * @apiSuccess (200) {String} notifications.event Event type to send notifications for.  It’s recommended to set events on the job and not individual rendition outputs since renditions will finish simultaneously.
 * @apiSuccess (200) {Object[]} add_cdns Array of additional CDN providers to be used for manifest generation. For each CDN provided, the manifest will be prepended accordingly
 * @apiSuccess (200) {String} add_cdns.label A label to identify the CDN.
 * @apiSuccess (200) {String} add_cdns.prepend Typically, a domain or path to prepend to addresses
 * @apiSuccess (200) {String} add_cdns.protocol Protocol to use in sending the stream to the CDN.
 *
 * @apiSuccessExample {object} Success Response Standard Live Stream:
 *    HTTP/1.1 200 OK
 *    {
 *    	"id": "6666482ac53b4f9bac473157c0897bde",
 *    	"outputs": [
 *    		{
 *    			"id": "0-6666482ac53b4f9bac473157c0897bde",
 *    			"playback_url": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_0/chunklist.m3u8",
 *    			"playback_url_dvr": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_0/chunklist_dvr.m3u8",
 *    			"playback_url_vod": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_0/chunklist_vod.m3u8",
 *    			"playback_added_cdns": [],
 *    			"label": "hls1080p"
 *    		},
 *    		{
 *    			"id": "1-6666482ac53b4f9bac473157c0897bde",
 *    			"playback_url": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_1/chunklist.m3u8",
 *    			"playback_url_dvr": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_1/chunklist_dvr.m3u8",
 *    			"playback_url_vod": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_1/chunklist_vod.m3u8",
 *    			"playback_added_cdns": [],
 *    			"label": "hls720p"
 *    		},
 *    		{
 *    			"id": "2-6666482ac53b4f9bac473157c0897bde",
 *    			"playback_url": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_2/chunklist.m3u8",
 *    			"playback_url_dvr": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_2/chunklist_dvr.m3u8",
 *    			"playback_url_vod": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/profile_2/chunklist_vod.m3u8",
 *    			"playback_added_cdns": [],
 *    			"label": "hls480p"
 *    		},
 *    		{
 *    			"id": "3-6666482ac53b4f9bac473157c0897bde",
 *    			"playlist_type": "defaultS3",
 *    			"type": "playlist",
 *    			"filename": "playlist.m3u8",
 *    			"dvr_filename": "playlist_dvr.m3u8",
 *    			"playback_url": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/playlist.m3u8",
 *    			"playback_url_dvr": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/playlist_dvr.m3u8"
 *    		}
 *    	],
 *    	"stream_url": "rtmp://ep2-usw2.bcovlive.io:1935/6666482ac53b4f9bac473157c0897bde",
 *    	"stream_name": "alive",
 *    	"static": false,
 *    	"encryption": {},
 *    	"playback_url": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/playlist.m3u8",
 *    	"playback_url_dvr": "https://bcovlive-a.akamaihd.net/6666482ac53b4f9bac473157c0897bde/us-west-2/NA/playlist_dvr.m3u8"
 *    }
 *
 * @apiSuccessExample {object} Success Response Live Stream with Multiple Output Playlists:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "edcd4d356228417d80345a0c91864efe",
 *      "outputs": [
 *        {
 *          "id": "0-edcd4d356228417d80345a0c91864efe",
 *          "label": "hls1080p"
 *        },
 *        {
 *          "id": "1-edcd4d356228417d80345a0c91864efe",
 *          "label": "hls720p"
 *        },
 *        {
 *          "id": "2-edcd4d356228417d80345a0c91864efe",
 *          "label": "AudioOnly"
 *        },
 *        {
 *          "id": "3-edcd4d356228417d80345a0c91864efe",
 *          "playlist_type": "defaultS3",
 *          "type": "playlist",
 *          "label": "playlistVideoALL",
 *          "filename": "8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *          "dvr_filename": "8b31bafdb20d462ea2e6e336a67ed4f3_dvr.m3u8",
 *          "streams": [
 *            "hls1080p",
 *            "hls720p"
 *          ],
 *          "playback_url": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *          "playback_url_dvr": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3_dvr.m3u8",
 *          "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8"
 *        },
 *        {
 *          "id": "4-edcd4d356228417d80345a0c91864efe",
 *          "playlist_type": "defaultS3",
 *          "type": "playlist",
 *          "label": "playlistHIGH",
 *          "filename": "playlist-high.m3u8",
 *          "dvr_filename": "playlist-high_dvr.m3u8",
 *          "streams": [
 *            "hls1080p"
 *          ],
 *          "playback_url": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-high.m3u8",
 *          "playback_url_dvr": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-high_dvr.m3u8",
 *          "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-high.m3u8"
 *        },
 *        {
 *          "id": "5-edcd4d356228417d80345a0c91864efe",
 *          "playlist_type": "defaultS3",
 *          "type": "playlist",
 *          "label": "playlistAudio",
 *          "filename": "playlist-audio.m3u8",
 *          "dvr_filename": "playlist-audio_dvr.m3u8",
 *          "streams": [
 *            "AudioOnly"
 *          ],
 *          "playback_url": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-audio.m3u8",
 *          "playback_url_dvr": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-audio_dvr.m3u8",
 *          "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/playlist-audio.m3u8"
 *        }
 *      ],
 *      "stream_url": "rtmp://host/edcd4d356228417d80345a0c91864efe",
 *      "stream_name": "alive",
 *      "playback_url": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *      "playback_url_dvr": "http://bcovlive-a.akamaihd.net/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3_dvr.m3u8",
 *      "playback_url_s3": "s3://BUCKET/edcd4d356228417d80345a0c91864efe/us-west-2/8b31bafdb20d462ea2e6e336a67ed4f3.m3u8",
 *    }
 *
 * @apiSuccessExample {json} Success Response Live Stream with a Multiple CDN Config:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "b3c20e416f964fb1b67334877bade99b",
 *      "outputs": [
 *        {
 *          "id": "0b3c20e416f964fb1b67334877bade99b",
 *          "playback_url": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist.m3u8",
 *          "playback_url_dvr": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_dvr.m3u8",
 *          "playback_url_vod": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8",
 *          "playback_added_cdns": [
 *            {
 *              "label": "akamai",
 *              "playback_url": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist.m3u8",
 *              "playback_url_dvr": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *            },
 *            {
 *              "label": "level3_1",
 *              "playback_url": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist.m3u8",
 *              "playback_url_dvr": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *            }
 *          ],
 *          "label": "hls1"
 *        },
 *        {
 *          "id": "1b3c20e416f964fb1b67334877bade99b",
 *          "playback_url": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist.m3u8",
 *          "playback_url_dvr": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_dvr.m3u8",
 *          "playback_url_vod": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_vod.m3u8",
 *          "playback_added_cdns": [
 *            {
 *              "label": "akamai",
 *              "playback_url": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist.m3u8",
 *              "playback_url_dvr": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_vod.m3u8"
 *            },
 *            {
 *              "label": "level3_1",
 *              "playback_url": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist.m3u8",
 *              "playback_url_dvr": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_dvr.m3u8",
 *              "playback_url_vod": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_1/chunklist_vod.m3u8"
 *            }
 *          ],
 *          "label": "hls2"
 *        }
 *      ],
 *      "stream_url": "rtmp://ep16-usw2.a-live.io:1935/b3c20e416f964fb1b67334877bade99b",
 *      "stream_name": "alive",
 *      "playback_url": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist.m3u8",
 *      "playback_url_dvr": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist_dvr.m3u8",
 *      "playback_url_vod": "http://bcovlive-a.akamaihd.net/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8",
 *      "playback_added_cdns": [
 *        {
 *          "label": "akamai",
 *          "playback_url": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist.m3u8",
 *          "playback_url_dvr": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist_dvr.m3u8",
 *          "playback_url_vod": "http://akamai.playback.com/someApplication/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *        },
 *        {
 *          "label": "level3_1",
 *          "playback_url": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist.m3u8",
 *          "playback_url_dvr": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/playlist_dvr.m3u8",
 *          "playback_url_vod": "http://l3.playback.io/somPath/someApplication/someFolder/b3c20e416f964fb1b67334877bade99b/us-west-2/profile_0/chunklist_vod.m3u8"
 *        }
 *      ]
 *    }
 *
 *
 * @apiSuccessExample {object} Success Response Live Stream with SSAI and VOD output:
 *    HTTP/1.1 200 OK
 *    {
 *       "id": "3158f1c9bc5c462182079f434ba4ae0a",
 *       "outputs": [
 *          {
 *             "id": "03158f1c9bc5c462182079f434ba4ae0a",
 *             "playback_url":"http://host/job_id/us-west-2/profile_0/chunklist.m3u8",
 *             "Playback_url_dvr": "http://host/job_id/us-west-2/profile_0/chunklist_dvr.m3u8",
 *             "playback_url_vod": "http://host/job_id/us-west-2/profile_0/chunklist_vod.m3u8",
 *             "label": "Out0"
 *          },
 *          {
 *             "id": "13158f1c9bc5c462182079f434ba4ae0a",
 *             "playback_url": "http://host/job_id/us-west-2/profile_1/chunklist.m3u8",
 *             "playback_url_dvr": "http://host/job_id/us-west-2/profile_1/chunklist_dvr.m3u8",
 *             "playback_url_vod": "http://host/job_id/us-west-2/profile_1/chunklist_vod.m3u8",
 *             "label": "Out1"
 *          },
 *          {
 *             "id": "23158f1c9bc5c462182079f434ba4ae0a",
 *             "playback_url": "http://host/job_id/us-west-2/profile_2/chunklist.m3u8",
 *             "playback_url_dvr": "http://host/job_id/us-west-2/profile_2/chunklist_dvr.m3u8",
 *             "playback_url_vod": "http://host/job_id/us-west-2/profile_2/chunklist_vod.m3u8",
 *             "label": "Out2"
 *          }
 *       ],
 *       "stream_url": "rtmp://ep6-usw2.a-live.io:1935/3158f1c9bc5c462182079f434ba4ae0a",
 *       "stream_name": "alive",
 *       "playback_url": "http://host/job_id/us-west-2/playlist.m3u8",
 *       "playback_url_dvr": "http://host/job_id/us-west-2/playlist_dvr.m3u8"
 *    }
 *
 * @apiError (400) {object} BAD_REQUEST: Invalid region - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (400) {object} BAD_REQUEST: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 * @apiError (500) {object} INTERNAL_SERVER_ERROR: After filtering, there is no job to process - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
 *
 * @apiErrorExample {object} 404 Error Response
 *    HTTP/1.1 404 Not Found
 *    {
 *        "error_code": "NOT_FOUND",
 *        "message": "Requested resource does not exist",
 *        "request_id": "df35af83-ac9b-44b0-b172-a80a11bd0bfa"
 *    }
 *
 *
 */

 // Cancel Live Job

 /**
  * @api {put} /v1/jobs/{job_id}/cancel Cancel Live Job
  * @apiName Cancel Live Job
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Cancel a live stream
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (Path) {String} job_id The job id.
  *
  * @apiParamExample {String} Stop Live Stream Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/cancel
  *
  * @apiSuccess (200) {String} id The job id for the stream that was stopped
  *
  * @apiSuccessExample {object} Success Response Stop a Live Stream:
  *    HTTP/1.1 200 OK
  *    {
  *        "id": "3158f1c9bc5c462182079f434ba4ae0a"
  *    }
  *
  * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (500) {object} INTERNAL_SERVER_ERROR: After filtering, there is no job to process - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */

 // Activate SEP Stream

 /**
  * @api {put} /v1/jobs/{job_id}/activate Activate SEP Stream
  * @apiName Activate SEP Stream
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Activate SEP (static entry point) Stream
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (Path) {String} job_id The job id.
  *
  * @apiParamExample {String} Activate SEP Job Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/activate
  *
  * @apiSuccess (200) {String} id The job id for the stream that was activated
  *
  * @apiSuccessExample {object} Success Response Stop a Live Stream:
  *    HTTP/1.1 200 OK
  *    {
  *        "id": "3158f1c9bc5c462182079f434ba4ae0a"
  *    }
  *
  * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (500) {object} INTERNAL_SERVER_ERROR: After filtering, there is no job to process - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */

 // Deactivate SEP Stream

 /**
  * @api {put} /v1/jobs/{job_id}/deactivate Deactivate SEP Stream
  * @apiName Deactivate SEP Stream
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Deactivate SEP (static entry point) Stream
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (Path) {String} job_id The job id.
  *
  * @apiParamExample {String} Deactivate SEP Job Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/deactivate
  *
  * @apiSuccess (200) {String} id The job id for the stream that was Deactivated
  *
  * @apiSuccessExample {json} Success Response Stop a Live Stream:
  *    HTTP/1.1 200 OK
  *    {
  *        "id": "3158f1c9bc5c462182079f434ba4ae0a"
  *    }
  *
  * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (500) {object} INTERNAL_SERVER_ERROR: After filtering, there is no job to process - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */


// Get Live Job Details

 /**
  * @api {get} /v1/jobs/{job_id} Get Live Job Details
  * @apiName Get Live Job Details
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Get Live Job Details
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} job_id The job id.
  *
  * @apiParamExample {String} Get Live Job Details Example:
  *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a
  *
  * @apiSuccess (200) {Object} job Object containing the job details
  * @apiSuccess (200) {string} job.created_at ISO 8601 date-time string representing when the job was created
  * @apiSuccess (200) {string} job.finished_at ISO 8601 date-time string representing when the live stream was stopped
  * @apiSuccess (200) {String} job.id The live job id
  * @apiSuccess (200) {String} job.state The current state of the job - possible values for Live jobs are `standby`, `waiting`, `processing`, `disconnected`. `finishing`, `finished`, `cancelling`, `cancelled`, `failed`; possible values for VOD jobs are `waiting_finish_live`, `waiting`, `processing`, `creating_asset`, `cancelling`, `cancelled`, `finished`, `failed`
  * @apiSuccess (200) {string} job.submitted_at ISO 8601 date-time string representing when the job was submitted
  * @apiSuccess (200) {string} job.updated_at ISO 8601 date-time string representing when the job was last modified
  * @apiSuccess (200) {String} job.region The Amazon AWS region to use for encoding the job
  * @apiSuccess (200) {Number} job.reconnect_time The time, in seconds, that the system will wait for a stream to reconnect to the encoder
  * @apiSuccess (200) {Number} job.event_length Used to preset and define an end time for the live event. At any point within the specified `event_length` you may reconnect to your stream. The `event_length` setting goes into effect as soon as streaming begins.
  * @apiSuccess (200) {Boolean} job.live_stream Indicates whether this is a live stream or VOD
  * @apiSuccess (200) {Boolean} job.ad_insertion Indicates whether SSAI is enabled
  * @apiSuccess (200) {String} job.playback_url Playback URL for the live stream
  * @apiSuccess (200) {String} job.playback_url_dvr Playback URL for the live DVR
  * @apiSuccess (200) {Object} job.input_media_file Object containing properties for the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_bitrate_in_kbps Audio bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.audio_codec Audio codec of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_sample_rate Audio sample rate of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} job.input_media_file.channels The number of audio channels
  * @apiSuccess (200) {string} job.input_media_file.created_at ISO 8601 date-time string representing when the input file was created
  * @apiSuccess (200) {Number} job.input_media_file.duration_in_ms duration_in_ms.
  * @apiSuccess (200) {String} job.input_media_file.error_class Type of error thrown
  * @apiSuccess (200) {String} job.input_media_file.error_message Error message thrown
  * @apiSuccess (200) {Number} job.input_media_file.file_size_bytes File size
  * @apiSuccess (200) {string} job.input_media_file.finished_at ISO 8601 date-time string representing when the input file was finished
  * @apiSuccess (200) {String} job.input_media_file.format Format of the input file
  * @apiSuccess (200) {Number} job.input_media_file.frame_rate Frame rate of the input file
  * @apiSuccess (200) {Number} job.input_media_file.height Frame height of the input file
  * @apiSuccess (200) {String} job.input_media_file.id System id of the input file
  * @apiSuccess (200) {String} job.input_media_file.md5_checksum Checksum for the input file
  * @apiSuccess (200) {String} job.input_media_file.state Current state of input file processing
  * @apiSuccess (200) {string} job.input_media_file.updated_at ISO 8601 date-time string representing when the input file was last modified
  * @apiSuccess (200) {Number} job.input_media_file.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.video_codec Video codec of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.width Frame width of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.total_bitrate_in_kbps Total bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.url URL for the input media file
  * @apiSuccess (200) {String} job.slate id for a slate of assets included
  * @apiSuccess (200) {Object} job.stream Object containing properties for the live stream
  * @apiSuccess (200) {string} job.stream.created_at ISO 8601 date-time string representing when the stream was created
  * @apiSuccess (200) {Number} job.stream.duration ISO Duration of the stream in seconds
  * @apiSuccess (200) {string} job.stream.finished_at ISO 8601 date-time string representing when the stream was finished
  * @apiSuccess (200) {Number} job.stream.height Frame height of the stream
  * @apiSuccess (200) {String} job.stream.id System id of the stream
  * @apiSuccess (200) {String} job.stream.name Name of the stream
  * @apiSuccess (200) {String} job.stream.protocol Protocol of the stream
  * @apiSuccess (200) {string} job.stream.updated_at ISO 8601 date-time string representing when the stream was last modified
  * @apiSuccess (200) {Number} job.stream.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (200) {String} job.stream.video_codec Video codec of the input media file
  * @apiSuccess (200) {Number} job.stream.width Frame width of the stream
  * @apiSuccess (200) {Number} job.stream.total_bitrate_in_kbps Total bitrate of the stream
  * @apiSuccess (200) {String} job.stream.region AWS region list specified for the account
  * @apiSuccess (200) {String} job.stream.url URL for the stream
  * @apiSuccess (200) {Object} job.stream.location Object representing the location of the stream
  * @apiSuccess (200) {Object} job.stream.location.source Object representing the location source of the stream
  * @apiSuccess (200) {Object} job.stream.destination Object representing the destination of the stream
  * @apiSuccess (200) {Object} job.stream.destination.source Object representing the destination source of the stream
  * @apiSuccess (200) {Object[]} job.output_media_files Array of objects containing properties for the output media files
  * @apiSuccess (200) {Number} job.output_media_files.audio_bitrate_in_kbps Audio bitrate of the output media file
  * @apiSuccess (200) {String} job.output_media_files.audio_codec Audio codec of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.audio_sample_rate Audio sample rate of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} job.output_media_files.channels The number of audio channels
  * @apiSuccess (200) {string} job.output_media_files.created_at ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (200) {Number} job.output_media_files.duration_in_ms ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (200) {String} job.output_media_files.error_class Type of error thrown
  * @apiSuccess (200) {String} job.output_media_files.error_message Error message thrown
  * @apiSuccess (200) {Number} job.output_media_files.file_size_bytes File size
  * @apiSuccess (200) {string} job.output_media_files.finished_at ISO 8601 date-time string representing when the output file was finished
  * @apiSuccess (200) {String} job.output_media_files.format Format of the output file
  * @apiSuccess (200) {Number} job.output_media_files.frame_rate Frame rate of the output file
  * @apiSuccess (200) {Number} job.output_media_files.height Frame height of the output file
  * @apiSuccess (200) {String} job.output_media_files.id System id of the output file
  * @apiSuccess (200) {String} job.output_media_files.md5_checksum Checksum for the output file
  * @apiSuccess (200) {String} job.output_media_files.state Current state of output file processing
  * @apiSuccess (200) {string} job.output_media_files.updated_at ISO 8601 date-time string representing when the output file was last modified
  * @apiSuccess (200) {Number} job.output_media_files.video_bitrate_in_kbps Video bitrate of the output media file
  * @apiSuccess (200) {String} job.output_media_files.video_codec Video codec of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.width Frame width of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.total_bitrate_in_kbps Total bitrate of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (200) {Boolean} job.output_media_files.keyframe_interval_follow_source Whether keyframe rate for the output matches the source
  * @apiSuccess (200) {Number} job.output_media_files.live_stream Whether the output is a live stream
  * @apiSuccess (200) {Boolean} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (200) {String} job.output_media_files.playback_url URL for the output file
  * @apiSuccess (200) {String} job.output_media_files.playback_url_dvr Live DVR url for live stream output
  * @apiSuccess (200) {String} job.output_media_files.playback_url_vod  URL for VOD output
  * @apiSuccess (200) {String} job.output_media_files.playlist_type Playlist type for playlist output
  * @apiSuccess (200) {String} job.output_media_files.type Will be `playlist` for playlist output
  * @apiSuccess (200) {String} job.output_media_files.filename File name for the playlist manifest
  * @apiSuccess (200) {String} job.output_media_files.dvr_filename File name for the DVR playlist manifest
  *
  * @apiSuccessExample {object} Success Response Get Live Job Details:
  *    HTTP/1.1 200 OK
  *    {
  *      "job": {
  *        "job_out_bytes": 0,
  *        "job_playlists": [
  *          {
  *            "delivery": {
  *              "media_cdn_prepend": "bcovlive-a.akamaihd.net",
  *              "ssai_cdn_prepend": "bcovlive-a.akamaihd.net",
  *              "media_cdn_protocol": "https",
  *              "ssai_cdn_protocol": "https",
  *              "ssai_manifest_append": "_ssaiM"
  *            },
  *            "masterLocation": "alive-pr-us-west-2-media",
  *            "default_playlist_name": "playlist.m3u8",
  *            "type": {
  *              "protocol": "HTTP",
  *              "profile": "BcovAliveCupertino",
  *              "name": "defaultS3",
  *              "streaming_delivery_format": "hls",
  *              "video_format": "mpeg-ts",
  *              "pushpublish": "bcov",
  *              "type": "S3"
  *            },
  *            "profile_sources": [
  *              "profile_0",
  *              "profile_1",
  *              "profile_2"
  *            ],
  *            "default_dvr_playlist_name": "playlist_dvr.m3u8",
  *            "playlist_name": "playlist.m3u8",
  *            "default_chunklist_name": "chunklist.m3u8",
  *            "default_dvr_chunklist_name": "chunklist_dvr.m3u8",
  *            "playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/playlist.m3u8",
  *            "default_vod_chunklist_name": "chunklist_vod.m3u8",
  *            "default_s3_bucket": "alive-pr-[[region]]-media",
  *            "dvr_playlist_name": "playlist_dvr.m3u8",
  *            "default_s3_bucket_ads": "alive-pr-[[region]]-ads",
  *            "playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/playlist_dvr.m3u8"
  *          }
  *        ],
  *        "worker_id": "20f41b48fc7648e697fe464063f1a14e",
  *        "job_raw_input": {
  *          "outputs": [
  *            {
  *              "video_codec": "h264",
  *              "keyframe_interval": 60,
  *              "live_stream": true,
  *              "segment_seconds": 6,
  *              "width": 1920,
  *              "h264_profile": "main",
  *              "label": "hls1080p",
  *              "video_bitrate": 2400,
  *              "height": 1080
  *            },
  *            {
  *              "video_codec": "h264",
  *              "keyframe_interval": 60,
  *              "live_stream": true,
  *              "segment_seconds": 6,
  *              "width": 1280,
  *              "h264_profile": "main",
  *              "label": "hls720p",
  *              "video_bitrate": 1843,
  *              "height": 720
  *            },
  *            {
  *              "video_codec": "h264",
  *              "keyframe_interval": 60,
  *              "live_stream": true,
  *              "segment_seconds": 6,
  *              "width": 640,
  *              "h264_profile": "main",
  *              "label": "hls480p",
  *              "video_bitrate": 819,
  *              "height": 360
  *            }
  *          ],
  *          "live_stream": true,
  *          "live_sliding_window_duration": 30,
  *          "region": "us-west-2",
  *          "reconnect_time": 20
  *        },
  *        "job_id": "95064b4274e243f4814dd6971a3c2dd7",
  *        "job_group_all_stream_name": "all",
  *        "job_in_bytes_rate": 0,
  *        "job_region": "us-west-2",
  *        "job_in_bytes": 0,
  *        "job_load": 390,
  *        "job_input": {
  *          "live_dvr_ads_window_duration_ms": 600000,
  *          "vod_sliding_window_duration_ms": 86399000,
  *          "ext_x_version": 3,
  *          "static": false,
  *          "number_of_segments_in_dvr_chunklist": 5,
  *          "reconnect_time_ms": 20000,
  *          "randomize_chunk_url": true,
  *          "ad_insertion": false,
  *          "max_waiting_time_ms": 1800000,
  *          "metadata_passthrough": false,
  *          "vod_enabled": true,
  *          "live_sliding_window_duration_ms": 30000,
  *          "segment_duration_ms": 6000,
  *          "live_dvr_sliding_window_duration_ms": 30000,
  *          "event_length_ms": 0,
  *          "number_of_segments_in_live_chunklist": 3,
  *          "number_of_segments_in_vod_chunklist": 14399,
  *          "channel_type": "event",
  *          "region": "us-west-2"
  *        },
  *        "account_billing_id": "NA",
  *        "job_cleaning_started_at": 1526243489574,
  *        "job_stream_url": "rtmp://ep6-usw2.bcovlive.io:1935/95064b4274e243f4814dd6971a3c2dd7",
  *        "job_ssai_state": "none",
  *        "job_outputs": [
  *          {
  *            "video_height": 1080,
  *            "video_width": 1920,
  *            "audio_codec": "AAC",
  *            "type": {
  *              "protocol": "HTTP",
  *              "profile": "BcovAliveCupertino",
  *              "name": "defaultS3",
  *              "streaming_delivery_format": "hls",
  *              "video_format": "mpeg-ts",
  *              "pushpublish": "bcov",
  *              "type": "S3"
  *            },
  *            "video_fit_mode": "stretch",
  *            "profile_name": "profile_0",
  *            "segment_duration_ms": 6000,
  *            "playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_0/chunklist.m3u8",
  *            "video_keyframe_interval_follow_source": false,
  *            "playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_0/chunklist_dvr.m3u8",
  *            "video_codec": "H.264",
  *            "video_codec_level": "3.1",
  *            "playback_url_vod": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_0/chunklist_vod.m3u8",
  *            "audio_bitrate_bps": 196608,
  *            "gpuid": -1,
  *            "video_keyframe_interval": 60,
  *            "label": "hls1080p",
  *            "info_streaming_delivery_format": "hls",
  *            "video_codec_profile": "main",
  *            "name": "Out0",
  *            "info_format": "mpeg-ts",
  *            "video_bitrate_bps": 2457600,
  *            "ui_playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_0/chunklist.m3u8",
  *            "ui_playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_0/chunklist_dvr.m3u8",
  *            "ui_playback_url_vod": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_0/chunklist_vod.m3u8"
  *          },
  *          {
  *            "video_height": 720,
  *            "video_width": 1280,
  *            "audio_codec": "AAC",
  *            "type": {
  *              "protocol": "HTTP",
  *              "profile": "BcovAliveCupertino",
  *              "name": "defaultS3",
  *              "streaming_delivery_format": "hls",
  *              "video_format": "mpeg-ts",
  *              "pushpublish": "bcov",
  *              "type": "S3"
  *            },
  *            "video_fit_mode": "stretch",
  *            "profile_name": "profile_1",
  *            "segment_duration_ms": 6000,
  *            "playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_1/chunklist.m3u8",
  *            "video_keyframe_interval_follow_source": false,
  *            "playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_1/chunklist_dvr.m3u8",
  *            "video_codec": "H.264",
  *            "video_codec_level": "3.1",
  *            "playback_url_vod": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_1/chunklist_vod.m3u8",
  *            "audio_bitrate_bps": 196608,
  *            "gpuid": -1,
  *            "video_keyframe_interval": 60,
  *            "label": "hls720p",
  *            "info_streaming_delivery_format": "hls",
  *            "video_codec_profile": "main",
  *            "name": "Out1",
  *            "info_format": "mpeg-ts",
  *            "video_bitrate_bps": 1887232,
  *            "ui_playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_1/chunklist.m3u8",
  *            "ui_playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_1/chunklist_dvr.m3u8",
  *            "ui_playback_url_vod": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_1/chunklist_vod.m3u8"
  *          },
  *          {
  *            "video_height": 360,
  *            "video_width": 640,
  *            "audio_codec": "AAC",
  *            "type": {
  *              "protocol": "HTTP",
  *              "profile": "BcovAliveCupertino",
  *              "name": "defaultS3",
  *              "streaming_delivery_format": "hls",
  *              "video_format": "mpeg-ts",
  *              "pushpublish": "bcov",
  *              "type": "S3"
  *            },
  *            "video_fit_mode": "stretch",
  *            "profile_name": "profile_2",
  *            "segment_duration_ms": 6000,
  *            "playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_2/chunklist.m3u8",
  *            "video_keyframe_interval_follow_source": false,
  *            "playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_2/chunklist_dvr.m3u8",
  *            "video_codec": "H.264",
  *            "video_codec_level": "3.1",
  *            "playback_url_vod": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_2/chunklist_vod.m3u8",
  *            "audio_bitrate_bps": 196608,
  *            "gpuid": -1,
  *            "video_keyframe_interval": 60,
  *            "label": "hls480p",
  *            "info_streaming_delivery_format": "hls",
  *            "video_codec_profile": "main",
  *            "name": "Out2",
  *            "info_format": "mpeg-ts",
  *            "video_bitrate_bps": 838656,
  *            "ui_playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_2/chunklist.m3u8",
  *            "ui_playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_2/chunklist_dvr.m3u8",
  *            "ui_playback_url_vod": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/profile_2/chunklist_vod.m3u8"
  *          }
  *        ],
  *        "job_tick": 2,
  *        "job_transcoding_template_name": "95064b4274e243f4814dd6971a3c2dd7_trans_template",
  *        "job_cleaning_in_progress": false,
  *        "cloud_id": "ede5802b4167493eae6f8a93ac98f352",
  *        "job_sep_state": "none",
  *        "job_state": "waiting",
  *        "sep_data": {
  *
  *        },
  *        "job_created_at": 1526243482713,
  *        "account_id": "a95ac581551b4478b27910e5675db1f8",
  *        "job_stream_name": "alive",
  *        "job_cleaning_error": false,
  *        "job_out_bytes_rate": 0,
  *        "job_finished_at": 0,
  *        "user_id": "c2691d4d039040be96c190a949d754a7",
  *        "job_streaming_started_at": 0,
  *        "job_app_name": "95064b4274e243f4814dd6971a3c2dd7",
  *        "job_cancelling_flag": false,
  *        "job_last_state_change_at": 1526243482713,
  *        "encryption": {
  *
  *        },
  *        "permitted_to_add_dependent_vods": true,
  *        "vods": [
  *
  *        ],
  *        "job_playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/playlist.m3u8",
  *        "job_playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/playlist_dvr.m3u8",
  *        "job_ui_playback_url": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/playlist.m3u8",
  *        "job_ui_playback_url_dvr": "https://bcovlive-a.akamaihd.net/95064b4274e243f4814dd6971a3c2dd7/us-west-2/NA/playlist_dvr.m3u8"
  *      }
  *    }
  *
  * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  *
  */

// Manual Ad Cue Point Insertion

/**
  * @api {post} /v1/jobs/{job_id}/cuepoint Manual Ad Cue Point Insertion
  * @apiName Manual Ad Cue Point Insertion
  * @apiGroup Live_Jobs
  * @apiVersion 1.0.0
  *
  * @apiDescription Inserts a manual Cue-Out with a duration to the Live ingest point.
  *
  * @apiHeader {String} Content-Type: application/json
  * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
  *
  * @apiParam (URL Parameters) {String} job_id The job id you want details for.
  * @apiParam (Request Body Fields) {Number} duration An integer value to indicate the length of the ad break in seconds
  * @apiParam (Request Body Fields) {String} timecode When to insert the cuepoint in HH:MM:SS:FF from the stream start (FF = frames); if omitted, the cuepoint will be inserted immediately
  * @apiParam (Request Body Fields) {Object} [ad_server_data] a set of any variables (key/value pairs) that should be passed to the adServer
  *
  * @apiParamExample {json} Live Stream Cuepoint Insertion Request Body Example:
  *    {
  *       "duration": 30,
  *       "ad_server_data" : {
  *            "varToAdServer": "Hello",
  *            "adBreakId": 12312
  *            "adBreakCategory": "summer"
  *       }
  *    }
  *
  * @apiSuccess (200) {String} id The id of the live stream job
  * @apiSuccess (200) {Object} cue_point The cuepoint data
  * @apiSuccess (200) {String} cue_point.id The cuepoint id
  * @apiSuccess (200) {Number} cue_point.duration The cuepoint duration in seconds
  * @apiSuccess (200) {String} cue_point.accuracy The cuepoint insertion accuracy - may be `segment` or `frame`
  * @apiSuccess (200) {string} cue_point.inserted_at Time when the cue point was inserted in the stream
  *
  * @apiSuccessExample {json} Success response for cuepoint Insertion
  *    {
  *        "id": "JOB_ID",
  *        "cue_point": {
  *            "id": "adBreak-2f58393ada1442d98eca0817fa565ba4",
  *            "duration": 30,
  *            "accuracy": "segment", [ Can be segment or frame ]
  *            "inserted_at": "2017-07-21T09:30:46.307Z" [ Time when the cue point was inserted in the stream ]
  *        },
  *    }
  *
  * @apiError (Error 4xx) {json} BAD_REQUEST 400: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} BAD_REQUEST 400: The notification target type is not supported currently - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  * @apiError (Error 5xx) {json} INTERNAL_SERVER_ERROR 500: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
  *
  */

  // Insert ID3 timed metadata

  /**
    * @api {post} /v1/jobs/{job_id}/id3tag Insert ID3 timed metadata
    * @apiName Insert ID3 timed metadata
    * @apiGroup Live_Jobs
    * @apiVersion 1.0.0
    *
    * @apiDescription Inserts an ID3 timed metadata tag for an ongoing job. Note that: 1) If using timecode property, the job only stores the most recent request for insertion; 2) If using timecode property, the encoder must be sending SMPTE-formatted (HH:MM:SS:FF) timecode stored in the tc property via OnFI

    *
    * @apiHeader {String} Content-Type: application/json
    * @apiHeader {String} X-API-KEY X-API-KEY: {APIKey}
    *
    * @apiParam (URL Parameters) {String} job_id The job id you want details for.
    * @apiParam (Request Body Fields) {Object} id3_tag An object containing variables for the ID3 timed metadata
    * @apiParam (Request Body Fields) {String{1..4}} id3_tag.name A name for the tag
    * @apiParam (Request Body Fields) {String} id3_tag.value A value for the tag (maximum string data size 256KB)
    * @apiParam (Request Body Fields) {String} [id3_tag.timecode] Time to insert - by default, insertion is immediate - **Note: 1) If you use the `timecode` property, the job only only stores the most recent request for insertion; 2) If you use the `timecode` property, the encoder must be sending SMPTE-formatted (HH:MM:SS:FF) timecode stored in the `tc` property via OnFI; 3) Software encoders such as Wirecast and OBS *do not* support the sending timecode via OnFI packets in the RTMP stream; 4) Elemental hardware encoders *do* support the sending timecode via OnFI packets in the RTMP stream**
    *
    * @apiParamExample {json} ID3 timed metadata Insertion Request Body Example:
    *    {
    *        "id3_tag": {
    *            "name": "BCOV",
    *            "value": "my value",
    *            "timecode": "15:50:49:16"
    *        }
    *    }
    *
    * @apiSuccess (200) {String} id The job id
    * @apiSuccess (200) {Object} id3_tag The ID3 tag details
    * @apiSuccess (200) {String} id3_tag.tag_name The ID3 tag name
    * @apiSuccess (200) {String} id3_tag.tag_value The ID3 tag value
    *
    * @apiSuccessExample {object} Success response for ID3 timed metadata Insertion
    *    HTTP/1.1 200 OK
    *    {
    *      "id": "JOB_ID",
    *      "id3_tag": {
    *        "tag_name": "BCOV",
    *        "tag_value": "my value"
    *      }
    *    }
    *
    * @apiError (400) {object} BAD_REQUEST: Invalid input value - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    * @apiError (401) {object} UNAUTHORIZED: Unauthorized - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    * @apiError (404) {object} RESOURCE_NOT_FOUND: The api couldn't find the resource you requested - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    * @apiError (500) {object} INTERNAL_SERVER_ERROR: DB getItem, no results found - see [Live API Error Messages](https://support.brightcove.com/live-api-error-messages) for more details
    *
    */
