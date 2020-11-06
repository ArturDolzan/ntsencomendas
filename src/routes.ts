import { UserController } from '@controllers/User/UserController'
import { UserService } from '@services/User/UserService'
import { AuthController } from '@controllers/Infra/AuthController'
import { AuthService } from '@services/Infra/AuthService'
import { Router } from 'express'
import AuthMiddleware from './middlewares/AuthMiddleware'
import { OrderController } from '@controllers/Order/OrderController'
import { OrderService } from '@services/Orders/OrderService'

const router = Router()

router.post('/users', (request, response) => {
  return new UserController(new UserService()).store(request, response)
})

router.post('/auth', (request, response) => {
  return new AuthController(new AuthService()).auth(request, response)
})

router.post('/order', AuthMiddleware, (request, response) => {
  return new OrderController(new OrderService()).createNewOrder(request, response)
})

router.get('/order', AuthMiddleware, (request, response) => {
  return new OrderController(new OrderService()).listOrders(request, response)
})

router.put('/order', AuthMiddleware, (request, response) => {
  return new OrderController(new OrderService()).changeStatus(request, response)
})

export default router
