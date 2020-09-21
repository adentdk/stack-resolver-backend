import * as Knex from 'knex'


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('comment_votes', (table: Knex.TableBuilder) => {
    table.increments()
    table.integer('comment_id').unsigned().references('id').inTable('comments')
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('comment_votes')
}

