
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_account', table => {
        table.increments('id');
        table.string('username', 100).unique().notNullable(); 
        table.string('email', 100).unique().notNullable();
        table.string('password', 40).notNullable();
        table.string('first_name', 25);
        table.string('last_name', 25);
        table.string('location', 25);
        table.integer('age');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        // table.timestamp('last_activity').defaultTo(knex.fn.now());
        table.specificType('profile_picture', 'bytea');
        // table.boolean('is_moderator').defaultTo(false);
        // table.string('status', 100).defaultTo(null);
        // table.integer('user_status').unsigned();
        // table.foreign('user_status').references('id').inTable('user_status');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_account'); 
  };
  