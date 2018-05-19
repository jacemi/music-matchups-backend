
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorite_tag', table => {
        table.increments('id');
        table.string('name', 100).notNullable();
        table.json('similar_tags').defaultTo(null);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorite_tag');
};
