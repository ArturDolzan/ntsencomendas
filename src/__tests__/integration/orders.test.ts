import { OrderService } from '@services/Orders/OrderService'
import Order, { Status } from '@models/Orders'
import { createConnection, getConnection } from 'typeorm'

beforeAll(async () => {
  await createConnection()
})

afterAll(async () => {
  await getConnection().close()
})

beforeEach(async () => {
  const connection = getConnection()
  const entities = connection.entityMetadatas

  await Promise.all(entities.map(async (entity, idx) => {
    const repository = connection.getRepository(entity.name)
    await repository.query(`DELETE FROM ${entity.tableName}`)
  }))
})

describe('Orders', () => {
  it('Should create a new order calling the service class', async () => {
    const orderService = new OrderService()

    const order = new Order()
    order.status = Status.Opened
    order.description = 'Teste funcional criar nova ordem'

    const newOrder = await orderService.createNewOrder(order)

    expect(newOrder.description).toBe('Teste funcional criar nova ordem')
  })
})
