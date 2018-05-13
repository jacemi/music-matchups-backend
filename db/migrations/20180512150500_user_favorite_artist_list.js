
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_favorite_artist', table => {
        table.increments('id');
        table.string('name', 100).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('user_account_id').unsigned();
        table.foreign('user_account_id').references('id').inTable('user_account');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_favorite_artist');
};
