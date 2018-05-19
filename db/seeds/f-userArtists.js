
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorite_artist_user_account').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorite_artist_user_account').insert([
        {user_account_id: 1, favorite_artist_id: 1 },
        {user_account_id: 2, favorite_artist_id: 1 },
        {user_account_id: 3, favorite_artist_id: 1 },
        {user_account_id: 4, favorite_artist_id: 1 },
        {user_account_id: 5, favorite_artist_id: 2 },
        {user_account_id: 6, favorite_artist_id: 3 },
        {user_account_id: 7, favorite_artist_id: 4 },
        {user_account_id: 8, favorite_artist_id: 5 },
        {user_account_id: 1, favorite_artist_id: 2 },
        {user_account_id: 2, favorite_artist_id: 2 }
      ]);
    });
};
