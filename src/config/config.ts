import path from 'path'
import dotEnvExpand from 'dotenv-expand'
import dotEnv from 'dotenv'
import fs from 'fs'
import os from 'os'
const config = dotEnv.config({
  path: path.join(__dirname, '../../.env')
})

dotEnvExpand(config)

// tslint:disable-next-line: no-console
const parsedConfig = config.parsed as any
export default {
  node_env: process.env.NODE_ENV || 'development',
  server: {
    host: '0.0.0.0',
    port: parsedConfig.SERVICE_PORT || 3201,
  },
  metrics: {
    heartbeatInterval: Number(parsedConfig.HEARTBEAT_INTERVAL),
    commitSha: fs.readFileSync(__dirname + '/commit_sha', {encoding: 'utf-8'}) || 'manual-build',
    dockerHost: os.hostname(),
    version: process.env.npm_package_version || ''
  },
  postgres: {
    user: parsedConfig.PGSQL_DB_USER || 'user',
    password: parsedConfig.PGSQL_DB_PASSWORD || 'password',
    database: parsedConfig.PGSQL_DB_NAME || 'database',
    host: parsedConfig.PGSQL_DB_HOST || 'host',
    port: parsedConfig.PGSQL_DB_PORT || 5432,
  },
  rabbitmq: {
    hostname: parsedConfig.RABBITMQ_HOST || 'hostname',
    username: parsedConfig.RABBITMQ_USER || 'username',
    password: parsedConfig.RABBITMQ_PASS || 'password',
    port: parsedConfig.RABBITMQ_PORT || 5672,
    queue: parsedConfig.RABBITMQ_QUEUE || 'queue',
    exchange: parsedConfig.RABBITMQ_EXCHANGE || 'exchange',
    maxConnectionRetries: Number(parsedConfig.RABBITMQ_MAX_CONNECTION_RETRIES) || 10,
    initialRetryConnectionAfter: Number(parsedConfig.RABBITMQ_INITIAL_RETRY_CONNECTION_AFTER) || 1000,
    waitForNack: Number(parsedConfig.RABBITMQ_WAIT_BEFORE_NACK) || 5000,
  },
  elasticsearch: {
    host: parsedConfig.ELASTIC_HOST || 'host',
    port: parsedConfig.ELASTIC_PORT || 9200,
    index: parsedConfig.ELASTIC_EXAMPLE_INDEX || 'index',
    type: parsedConfig.ELASTIC_EXAMPLE_TYPE || 'type',
    pingTimeout: Number(parsedConfig.CONNECTION_TIMEOUT) || 5000,
  },
}