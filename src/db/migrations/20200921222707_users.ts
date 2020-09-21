import * as Knex from 'knex'


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments()
    table.string('display_name').notNullable()
    table.string('full_name').notNullable()
    table.string('avatar').nullable()
    table.enum('gender', ['male', 'female']).nullable()
    table.string('address_location').nullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

