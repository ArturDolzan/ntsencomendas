import User from '@models/User'
import { getRepository } from 'typeorm'
import { IUserService } from './IUserService'

class UserService implements IUserService {
  constructor () {}

  async store (obj: User): Promise<User> {
    const repository = getRepository(User)

    const { email, password, name } = obj

    const userExists = await repository.findOne({ where: { email } })

    if (userExists) {
      throw new Error('Usuário existe')
    }

    const user = repository.create({ email, password, name })
    await repository.save(user)

    return user
  }
}

export { UserService }
