import { Router } from 'express'
import { Controller } from '../controllers/Account'
import { methodNotAllowed } from '../helpers/routeHelper'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

export function routes (): Router {
  const api: Router = Router()
  const controller = new Controller()

  api
    .route('/')
    .get(controller.index)
    .all(methodNotAllowed)
  api
    .route('/register')
    .post(controller.register)
    .all(methodNotAllowed)
  api
    .route('/login')
    .post(controller.login)
    .all(methodNotAllowed)

  api.use(ensureAuthenticated)

  api
    .route('/profile')
    .get(controller.profile)
    .all(methodNotAllowed)

  return api
}
