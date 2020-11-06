import { Status } from './../../models/Orders'
import Order from '@models/Orders'

export interface IOrderService {
  createNewOrder (obj: Order): Promise<Order>
  listOrders (): Promise<Order[]>
  changeStatus (id: string, status: Status): Promise<void>
}
