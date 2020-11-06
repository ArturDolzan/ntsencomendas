import User from '@models/User'

export interface IUserService {
  store (obj: User): Promise<User>
}
