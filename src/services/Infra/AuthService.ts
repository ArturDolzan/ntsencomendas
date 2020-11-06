import { IAuth } from './IAuthService'
import bcrypt from 'bcryptjs'
import User from '@models/User'
import { getRepository } from 'typeorm'
import { IAuthService } from '../Infra/IAuthService'
import jwt from 'jsonwebtoken'
const { authSecret } = require('../../.secret')

class AuthService implements IAuthService {
  constructor () {}

  async auth (obj: User): Promise<IAuth> {
    const repository = getRepository(User)

    const { email, password } = obj

    const user = await repository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Usuário não existe!')
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      throw new Error('Senha ou usuário incorretos!')
    }

    delete user.password

    const token = jwt.sign({
      id: user.id
    }, authSecret, { expiresIn: '1d' })

    return { user, token }
  }
}

export { AuthService }
