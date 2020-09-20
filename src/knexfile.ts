import Knex from 'knex'
import path from 'path'
import config from './config/config'


const database = {
  client: 'pg',
  connection: {
    database: config.postgres.database,
    user: config.postgres.user,
    password: config.postgres.password
  },
  migrations: {
    directory: path.join(__dirname, 'db', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'db', 'seeds')
  },
} as Knex.Config


export default database