import { Router } from 'express'
import { Controller } from '../controllers/Profile'

export function routes (): Router {
  const api: Router = Router()
  const controller = new Controller()

  api.get('/', controller.index)

  return api
}
