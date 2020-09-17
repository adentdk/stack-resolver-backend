import http from 'http'
import { start } from './express'
import { logger } from './utils/logger'
import * as healthcheck from './utils/healthcheck'
import config from './config/config'

const app = start(config.node_env)
const port = config.server.port
const server = http.createServer(app)

healthcheck.init()

server.listen(Number(port), () => {
  logger.info('server up and running')
  logger.info(`at: http://localhost:${port}`)
  logger.info(`as ${config.node_env}`)
})

setInterval(healthcheck.updateServiceStatus, config.metrics.heartbeatInterval)
