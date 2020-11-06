import User from '@models/User'
import { IUserService } from '@services/User/IUserService'
import { Request, Response } from 'express'

class UserController {
  constructor (private userService: IUserService) {}

  async store (req: Request, res: Response): Promise<Response> {
    let registro: User = null

    try {
      registro = await this.userService.store(req.body)
    } catch (error) {
      return res.status(400).json(`Erro ao salvar ${error}`)
    }

    return res.status(200).json(registro)
  }
}

export { UserController }
