import { Router } from 'express'
import { Controller } from '../controllers/Auth'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

export function routes (): Router {
  const api: Router = Router()
  const controller = new Controller()

  api.get('/', controller.index)
  api.post('/register', controller.register)
  api.post('/login', controller.login)

  api.use(ensureAuthenticated)

  api.get('/profile', controller.profile)

  return api
}
