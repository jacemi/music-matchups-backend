
exports.up = function(knex, Promise) {
      return knex.schema.createTable('favorite_artist', table => {
        table.increments('id');
        table.string('name', 100).unique().notNullable();
        table.string('mbid', 100).defaultsTo(null);
        table.json('similar_artists').defaultTo(null);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorite_artist');
};
