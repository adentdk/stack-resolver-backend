import Knex from 'knex'
import path from 'path'
import config from './config/config'


const database = {
  client: 'mysql',
  connection: {
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password
  },
  migrations: {
    directory: path.join(__dirname, 'db', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'db', 'seeds')
  },
} as Knex.Config


export default database