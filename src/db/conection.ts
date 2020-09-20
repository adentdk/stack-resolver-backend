import Knex from 'knex'
import databaseConfig from './../knexfile'

const db = Knex(databaseConfig)

export default db
