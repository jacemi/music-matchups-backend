
exports.up = function(knex, Promise) {
    return knex.schema.createTable('thread', table => {
        table.increments('id');
        table.string('subject', 100).unique().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('last_activity').defaultTo(knex.fn.now());
        table.integer('user_account_id').unsigned();
        table.foreign('user_account_id').references('id').inTable('user_account');
        table.integer('status').unsigned();
        table.foreign('status').references('id').inTable('status');
        table.integer('forum_id').unsigned();
        table.foreign('forum_id').references('id').inTable('forum');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('thread');
};
