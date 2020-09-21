import * as Knex from 'knex'


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('auths', (table: Knex.TableBuilder) => {
    table.increments()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.boolean('is_online').notNullable().defaultTo(false)
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('auths')
}
