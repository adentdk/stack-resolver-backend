import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { routes as rootRoute } from './routes/root'
import { routes as accountRoute } from './routes/account'
import { routes as userRoute } from './routes/user'
import { routes as topicRoute } from './routes/topic'
import { logger } from './utils/logger'
import { notFound } from './helpers/routeHelper'

export function start (env: string): express.Application {
  logger.debug(`App running as ${env}`)
  const app: express.Application = express()

  if (env === 'production') {
    app.use(helmet())
    app.disable('x-powered-by')
    app.use(compression())
  } else {
    app.use(cors())
  }
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use('/', rootRoute())
  app.use('/account', accountRoute())
  app.use('/user', userRoute())
  app.use('/topic', topicRoute())

  app.use(notFound)

  return app
}
