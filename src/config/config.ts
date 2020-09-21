import fs from 'fs'
import os from 'os'

import * as dotenv from 'dotenv'

dotenv.config()

const BASE_PATH = `${__dirname}/../../`
let path: string = BASE_PATH
switch (process.env.NODE_ENV) {
  case 'local':
    path += '.env.local'
  case 'production':
    path += '.env.production'
  default:
    path += 'env.development'
}

dotenv.config({path})

export default {
  node_env: process.env.NODE_ENV || 'development',
  server: {
    host: '0.0.0.0',
    port: process.env.SERVICE_PORT || 3201,
  },
  metrics: {
    heartbeatInterval: Number(process.env.HEARTBEAT_INTERVAL),
    commitSha: fs.readFileSync(__dirname + '/commit_sha', {encoding: 'utf-8'}) || 'manual-build',
    dockerHost: os.hostname(),
    version: process.env.npm_package_version || ''
  },
  db: {
    dialect: process.env.DB || 'mysql',
    user: process.env.DB_USER || 'aden',
    password: process.env.DB_PASSWORD || 'Paketchat12!@',
    database: process.env.DB_NAME || 'stack_resolve',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET || 'SOME_JWT_SECRET'
  }
}