# User API
## User Schema

The following schema uses the npm package [superstruct](https://www.npmjs.com/package/superstruct)
```js
{
  id: 'string?',
  username: 'string',
  salt: 'string',
  password: 'string',
  site_id: 'array',
  admin: 'boolean',
},{ //defaults
  admin: false
}
```

## Actions
### Get All Users
**GET** `/api/user`
### Get User By Id
**GET** `/api/user/:id`
### Create User
**POST** `/api/user/create`
accepts a body like:
``` js
{
  user: {
    username: "Roger",
    password: "S!llyRabbit",
    site_id: [0],
    admin: false
  }
}
```
### Update User
**POST** `/api/user/update`
### Destroy/Delete User
**POST** `/api/user/destroy`
```js
{
  
}
```
### Authenticate User (login)
**POST** `/api/user/login`
