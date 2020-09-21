import { Router } from 'express'
import { Controller } from '../controllers/Root'

export function routes (): Router {
  const api: Router = Router()
  const controller = new Controller()

  api.get('/', controller.index)
  api.get('/ping', controller.ping)
  api.get('/metrics', controller.metrics)

  return api
}
