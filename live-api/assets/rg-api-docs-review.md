Unrelated open issue: KNOW-16892

## Create Redundant Group

* `processing_regions` is documented to be an `Array of objects` of the form `{ "region": "us-west-2", "probability": 1 }`. As Ted pointed out, the `probability` field is something we designed early in development, but is currently not supported yet, and there is no timeline yet to support it. I think it would be best to omit this from the documentation completely, and just document it as an `Array of strings`, the same as `storage_regions`. I realize that the `Get Redundant Group` API will return the `probability` field in its response, which could become confusing if we remove it in the request body documentation. Maybe we either need to add work to sanitize the output, or just document that it should always be one and doesn't actually mean anything right now? I see that your "Using Live Redundancy" guide documents this pretty well, so that might be enough.
* `drm` and `encryption` currently says `Not yet supported`. Maybe it would be best to omit these from the documentation until it is supported in case it changes once it is?


## Add Jobs to Redundant Group

* missing Request Body Schema. Should be an `Array of objects`

```
{
  "job_id": "string, required, live job to add.",
  "playlist": "string, optional, must be undefined if streams is defined, label of playlist to use as outputs",
  "streams": [
    "array of strings",
    "optional",
    "must be undefined if playlist is defined",
    "list of stream labels to use as outputs"
  ]
}
```

## Remove Jobs from Redundant Group

* Text says `Remove All Jobs from a Reundant Group`. The API only supports removing one job at a time. You need to make separate calls for each job you want to remove.
* Needs path parameter `job_id` for deletiong. API endpoint should be `DELETE /redundantgroups/{redundant_group_id}/jobs/{job_id}`
* Supports a `?force=true` query parameter. Normally, trying to remove the on-air job will result in a 400 error. Providing `?force=true` will remove the job even if it is on-air.
* There should be no request body

## Force Redundant Stream Failover

* Endpoint should be `PUT /redundantgroups/{redundant_group_id}/switch`
* Supports a `?force=true` query parameter. Redundant groups can only be deleted when in `standby` state. Providing `?force=true` will allow deletion of a Redundant Group in `processing` state.

