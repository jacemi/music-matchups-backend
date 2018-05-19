
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorite_tag_user_account', table => {
        table.integer('user_account_id').references('user_account.id');
        table.integer('favorite_tag_id').references('favorite_tag.id');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('favorite_tag_user_account');
};
