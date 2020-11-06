import Order, { Status } from '@models/Orders'
import { getRepository } from 'typeorm'
import { IOrderService } from './IOrdersService'

class OrderService implements IOrderService {
  constructor () {}

  async createNewOrder (obj: Order): Promise<Order> {
    const repository = getRepository(Order)

    const { description } = obj

    const order = repository.create({ description })
    order.status = Status.Opened

    await repository.save(order)

    return order
  }

  async listOrders (): Promise<Order[]> {
    const repository = getRepository(Order)

    const orders = await repository.find()

    return orders
  }

  async changeStatus (id: string, status: Status): Promise<void> {
    const repository = getRepository(Order)

    const order = await repository.findOne({ id })

    if (!order) {
      throw new Error('Encomenda não encontrada')
    }

    order.status = status

    await repository.save(order)
  }
}

export { OrderService }
