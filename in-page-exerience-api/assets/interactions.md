# Interactions API

## Endpoints

### List Interactions

```
GET https://experiences.api.brightcove.com/v1/accounts/{accountId}/interactions
```

Retrieves a list of interactions related to the given `accountId`.

### Create an Interaction

```
POST https://experiences.api.brightcove.com/v1/accounts/{accountId}/interactions
```

Creates a new interaction for the given `accountId`.  Returns the new interaction.

### Get an Interaction

```
GET https://experiences.api.brightcove.com/v1/accounts/{accountId}/interactions/{interactionId}
```

Gets the interaction with id `interactionId` for the given `accountId`.

### Update an Interaction

```
PUT https://experiences.api.brightcove.com/v1/accounts/{accountId}/interactions/{interactionId}
```

Updates the interaction with id `interactionId` for the given `accountId`.  Returns the updated interaction.

### Delete an Interaction

```
DELETE https://experiences.api.brightcove.com/v1/accounts/{accountId}/interactions/{interactionId}
```

Deletes the interaction with id `interactionId` for the given `accountId`.

## Resources

### Interaction

The top level resource returned by the above API endpoints

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | String | ID of the interaction [read-only] |
| accountId | Number | Account the interaction belongs to [read-only] |
| experience | String | ID of the experience the interaction belongs to [read-only] |
| videoId | String | ID of the video the interaction belongs to (null for global interactions) [read-only] |
| createdAt | String | When the interaction was created [read-only] |
| updatedAt | String | When the interaction was last updated [read-only] |
| start | CuePoint | When the interaction starts |
| end | CuePoint | When the interaction ends |
| durationType | String | Duration type of the interaction (point, span, end, or full) |
| type | String | Type of interaction (Link, Card, or External) |

The different types of interactions have different additional fields:

#### Link

A link interaction

| Field | Type | Description |
| ----- | ---- | ----------- |
| text | String | Link text |
| href | String | Link URL |
| placement | String | Link placement (top-left, top-right, bottom-left, or bottom-right) |

#### Card

A card interaction

| Field | Type | Description |
| ----- | ---- | ----------- |
| title | String | Card title |
| description | String | Card description |
| linkText | String | Link text |
| href | String | Link URL |
| img | String | Card image |

#### External

An external (synchronized) interaction

| Field | Type | Description |
| ----- | ---- | ----------- |
| type | String | Type of external interaction (implementation dependent) |
| value | Any | External interaction value (implementation dependent) |

### CuePoint

An interaction cue-point

| Field | Type | Description |
| ----- | ---- | ----------- |
| quantity | Number | Cue point quantity / value |
| from | String | Where the cue point is relative from (start or end) |
| unit | String | Cue point unit (seconds or percent) |
