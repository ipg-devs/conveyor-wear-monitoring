import { superstruct } from 'superstruct';
import isEmail from 'is-email';

const struct = superstruct({
  types: {
    email: value => isEmail(value),
    id: value => ("string" === typeof value || "number" === typeof value)
  }
})

export default struct({
  id: 'id?',
  username: 'string',
  salt: 'string',
  email: 'email',
  password: 'string',
  site_id: 'array',
  admin: 'boolean',
},{
  admin: false
});
