import * as Knex from 'knex'


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('topics', (table: Knex.TableBuilder) => {
    table.increments()
    table.string('title').notNullable()
    table.string('tags').nullable()
    table.integer('viewed').defaultTo('0')
    table.integer('created_by').unsigned().references('id').inTable('users')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('topics')
}

