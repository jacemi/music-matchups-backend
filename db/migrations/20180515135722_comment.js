
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comment', table => {
        table.increments('id');
        table.string('content', 1000).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('user_account_id').unsigned();
        table.foreign('user_account_id').references('id').inTable('user_account');
        table.integer('post_id').unsigned();
        table.foreign('post_id').references('id').inTable('post');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment'); 
};
