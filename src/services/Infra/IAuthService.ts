import User from '@models/User'

export interface IAuth {
  user: User,
  token: string
}

export interface IAuthService {
  auth (obj: User): Promise<IAuth>
}
