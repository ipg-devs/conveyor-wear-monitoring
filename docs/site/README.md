# Site API

## Posting Data to the Server

### URL & Method
`HTTP POST @url/api/site/create`

### Headers


### Request Body
```json
{
  "data": [
    {
  "site_id": "", // string
  "timestamp":"", // Unix timestamp
  "fields": [
    {
      "target": "1", // string
      "revolutions": 0, // number
      "hours": 0, // number
      "1/16":"", // string "green" or "red"
      "1/8":"", // string "green" or "red"
      "1/4":"", // string "green" or "red"
      "location": [""], // [string] "green" or "yellow" or "red"
      "tracking":"", // string
      "note":"", // string
      "event":"" // string
    },
    {...}
  ]
}
```
