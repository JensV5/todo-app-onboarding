import { Client } from '../../../modules/auth/entities/client.entity.js'
import { Pkce } from '../../../modules/auth/entities/pkce.entity.js'
import { RefreshToken } from '../../../modules/auth/entities/refreshtoken.entity.js'
import { Role } from '../../../modules/roles/entities/role.entity.js'
import { User } from '../../../modules/users/entities/user.entity.js'
import { Todo } from '../../../modules/todo/entities/todo.entity.js'

export const mainModels = {
  Client,
  Pkce,
  RefreshToken,
  Role,
  User,
  Todo
}
