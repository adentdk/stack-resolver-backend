module.exports = {
  development: {
    dialect: process.env.DB || 'mysql',
    username: process.env.DB_USER || 'aden',
    password: process.env.DB_PASSWORD || 'Paketchat12!@',
    database: process.env.DB_NAME || 'stack_resolve',
    host: process.env.DB_HOST || 'localhost',
  },
  production: {
    dialect: process.env.DB || 'mysql',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'Admin123!@#',
    database: process.env.DB_NAME || 'stack_resolve',
    host: process.env.DB_HOST || 'mysql',
  }
}