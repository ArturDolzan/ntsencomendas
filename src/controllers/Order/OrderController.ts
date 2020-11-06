import Order, { Status } from '@models/Orders'
import { IOrderService } from '@services/Orders/IOrdersService'
import { Request, Response } from 'express'

class OrderController {
  constructor (private orderService: IOrderService) {}

  async createNewOrder (req: Request, res: Response): Promise<Response> {
    let registro: Order = null

    try {
      registro = await this.orderService.createNewOrder(req.body)
    } catch (error) {
      return res.status(400).json(`Erro ao criar nova ordem: ${error}`)
    }

    return res.status(200).json(registro)
  }

  async listOrders (req: Request, res: Response): Promise<Response> {
    let ordens: Order[] = null

    try {
      ordens = await this.orderService.listOrders()
    } catch (error) {
      return res.status(400).json(`Erro ao listar ordens: ${error}`)
    }

    return res.status(200).json(ordens)
  }

  async changeStatus (req: Request, res: Response): Promise<Response> {
    try {
      const { id, status } = req.body

      await this.orderService.changeStatus(id, status)
    } catch (error) {
      return res.status(400).json(`Erro ao listar ordens: ${error}`)
    }

    return res.status(200).json('Encomenda atualizada com sucesso!')
  }
}

export { OrderController }
