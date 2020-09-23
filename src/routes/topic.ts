import { Router } from 'express'
import { Controller } from '../controllers/Topic'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { methodNotAllowed } from '../helpers/routeHelper'

export function routes (): Router {
  const api: Router = Router()
  const controller = new Controller()

  api.use(ensureAuthenticated)

  api
    .route('/')
    .get(controller.index)
  api
    .route('/topics')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)
  api
    .route('/topics/:id')
    .get(controller.detail)
    .put(controller.edit)
    .delete(controller.delete)
    .all(methodNotAllowed)
  api
    .route('/topics/:topicId/comments')
    .get(controller.commentList)
    .post(controller.commentCreate)
    .put(controller.commentEdit)
    .delete(controller.commentDelete)
    .all(methodNotAllowed)

  return api
}
