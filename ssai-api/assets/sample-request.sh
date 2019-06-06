curl --request POST \
  --url https://ssai.api.brightcove.com/v1/accounts/1752604059001/ssai_configs \
  --header 'authorization: Bearer AN7j_bhs2-36jl2ykzAn0zfveKMx5x-MIfBLuEu24CaGIHGUUKGS4zqZczLQvWQWGc3oX9AerRoUdv4SQlm8lM417jMVB6R5E-4K_OUA8p1mLzX1JzQx21jWyFk_nH6YzTa4NTu5dBZcngMYBR5AhqWC5dR4zZnlS7Pb2tvhDtl5dH5sMtFU3rlUJGhPsLI1-oUdR2WHL8ga5nXVnvBnLmsAUymb-DeX7yx29-nvgH2Avj73VocuiKejAcYbl7GNniBhiIubP2r1VvemkKXoO2xcv-Xy_OlHv6cdBG_iU--7x8eGeseYfCrd6QsjGaHgeYNF0eDbL7JRHwwx-JVl9xpFE7Bcrwb87SDZEjHlsWcAH2nxssoGwCs_Rx7WeB6_aKfE9Xrn0u6wcZLKdReAJ6s6Pg8SL4AU2P4vr2k9698tZOKgaBZ6q8D3ntEaTsg1qejrubd_ZTaJiYoOlrFfC6uTwjO_4vyXEGWlrGyYkIePrK2rWzgZLn3dwfLlDh93XAXECEyROeDyPqdk-2pfMlf2t6hlYB90p8uR4KGSvjymtNEz8UG-a4uwkGpNND09d_l0YU10NHeXAuKt9AsKBtRCt-gz68PX0vt5nwZ18ixsPGR6PLDRik_G-yPvoR1bpnsmjnTE3XXgHwXtnzNkznSkm4IwDpNS9mypnJMYp8w5yMUmCqWMmBFxp0JkRIo7hUtxEEqW4VxFzruiwhJkA4YjSelj9ArCoO2SP7u5WgoBd6P9HYpxwA7ZPhO1JMMsuwqfLnRrMqm3xuMJptdPaL-G5d53bqc8toNgLW8CBytNaoh1URa5MkK-XolZjxAz_sa5BeJE5kICbRtpGr5JH6r4UKDswT4QLHpLJ0EIofExPeyZuyZ_wm9Pn1eBQIZ0w_PjZpvgHGhF6o4QzO-8TUQfTZCmZuyE3KdXKDTQ6d892LU-zLCwqxCplUzakgHhxvEEgTF5UgB7MhxO1oeetvhXMownPGqXkgFZ8odzQHYDCzKKNYE4iUylcvg2-tKg8rvZ46TTJOPUNZo86a0tunFkSJXCtymv4gdf6Bsu-s5qeuX-EDEenioGEiigBEizhI0dEj91VFkkxpaUwfpw3NJNwK3xlFbJOsu2IlY7vnODfCdRS3stT1xL26y5DLdy3P-8rEF-C3qiMemEHmghwZo0HOaTvSekz92Kvc5P4xkw7kHrhvHW0hAyk0gwftzO3t2JyL44YRt3gFw7PZDZxX9iSTeTzTg7iw' \
  --data '{
  "name": "SSAI VMAP 3",
  "description": "Sample ad configuration",
  "vmap_response_namespace": "bc",
  "ad_config": {
    "expected_ad_response": "dfp_vmap",
    "disable_server_beacons": false,
		"round_up_cue_points": false,
    "template_url": {
			"template": "http://solutions.brightcove.com/bcls/brightcove-player/vmap/simple-vmap.xml"
		},
		"defaults": {
			"session_id": "{{system.uuid}}"
		}
  },
	"beacon_templates": [
		{"type": "content_start"},
		{"type": "content_midpoint"},
		{"type": "ad_start"},
		{"type": "content_complete"}
	],
	"extend_beacon_guard_ttl": true,
	"discontinuities": {
		"dash": ["*"],
		"hls": ["*"]
	}
}
'
