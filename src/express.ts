import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { routes } from './routes/index'
import { logger } from './utils/logger'

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
  app.use(routes())

  return app
}
