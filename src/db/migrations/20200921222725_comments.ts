import * as Knex from 'knex'


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', (table: Knex.TableBuilder) => {
    table.increments()
    table.text('content').notNullable()
    table.integer('parent_id').unsigned().references('id').inTable('comments')
    table.integer('created_by').unsigned().references('id').inTable('users')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('comments')
}

