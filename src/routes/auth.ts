import { Router } from 'express'
import { Controller } from '../controllers/Auth'

export function routes (): Router {
  const api: Router = Router()
  const controller = new Controller()

  api.get('/', controller.index)
  api.post('/register', controller.register)
  api.post('/login', controller.login)

  return api
}
