
exports.up = function(knex, Promise) {
    // return knex.schema.createTable('post', table => {
    //     table.increments('id');
    //     table.string('subject', 100).unique().notNullable();
    //     table.string('content', 1000);
    //     table.timestamp('created_at').defaultTo(knex.fn.now());
    //     table.integer('user_account_id').unsigned();
    //     table.foreign('user_account_id').references('id').inTable('user_account');
    //     table.integer('status').unsigned();
    //     table.foreign('status').references('id').inTable('status');
    //     table.integer('thread_id').unsigned();
    //     table.foreign('thread_id').references('id').inTable('thread');
    // })
        return knex.schema.createTable('post', table => {
        table.increments('id');
        table.string('content', 2000).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('user_account_id').unsigned();
        table.foreign('user_account_id').references('id').inTable('user_account');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post'); 
};
