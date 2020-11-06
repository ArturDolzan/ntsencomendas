import { IAuth, IAuthService } from '@services/Infra/IAuthService'
import { Request, Response } from 'express'

class AuthController {
  constructor (private authService: IAuthService) {}

  async auth (req: Request, res: Response): Promise<Response> {
    let retorno: IAuth

    try {
      retorno = await this.authService.auth(req.body)
    } catch (error) {
      return res.status(400).json(`Erro ao gerar token ${error}`)
    }

    return res.status(200).json(retorno)
  }
}

export { AuthController }
