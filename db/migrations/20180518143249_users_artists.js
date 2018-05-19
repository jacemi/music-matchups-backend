
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_artists', table => {
      table.integer('user_account_id').references('user_account.id');
      table.integer('favorite_artist_id').references('favorite_artist.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_artists');
};
