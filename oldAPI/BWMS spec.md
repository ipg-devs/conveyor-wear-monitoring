## what do I need from the server?

```js
{
  site_id, // string
  timestamp, // Unix timestamp
  fields: [
    {
      target, // string/id/number
      revolutions, // number
      hours, // number
      "1/16", // string "green" or "red"
      "1/8", // string "green" or "red"
      "1/4", // string "green" or "red"
      location, // [string] "green" or "yellow" or "red"
      tracking, // string
      note, // string
      "event" // string
    },
    {...}
  ]
}
```
