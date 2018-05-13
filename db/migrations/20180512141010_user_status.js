
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_status', table => {
      table.increments('id');
      table.string('name', 100).defaultTo(null); 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_status'); 
};
