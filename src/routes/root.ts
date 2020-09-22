import { Router } from 'express'
import { Controller } from '../controllers/Root'
import { methodNotAllowed } from '../helpers/routeHelper'

export function routes (): Router {
  const api: Router = Router()
  const controller = new Controller()

  api
    .route('/')
    .get(controller.index)
    .all(methodNotAllowed)
  api
    .route('/ping')
    .get(controller.ping)
    .all(methodNotAllowed)
  api
    .route('/metrics')
    .get(controller.metrics)
    .all(methodNotAllowed)

  return api
}
