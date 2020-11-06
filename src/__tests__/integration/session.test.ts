import { UserService } from '@services/User/UserService'
import User from '@models/User'
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

describe('Authentication', () => {
  it('Should create a new user calling the service class', async () => {
    const userService = new UserService()

    const user = new User()
    user.email = 'teste@gmail.com'
    user.name = 'teste'
    user.password = '1'

    const newUser = await userService.store(user)

    expect(newUser.email).toBe('teste@gmail.com')
  })
})
