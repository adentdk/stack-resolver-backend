import {Sequelize, Dialect} from 'sequelize'
import config from '../config/config'

const databasename = config.db.database
const usernamedb = config.db.user
const passworddb = config.db.password
const dialect = config.db.dialect as Dialect
const host = config.db.host

export const sequelize = new Sequelize(databasename, usernamedb, passworddb, {
  dialect,
  host,
})

type DB = {
  sequelize: typeof sequelize
  Sequelize: typeof Sequelize
}

export const db: DB = {
  sequelize,
  Sequelize,
}

export default db