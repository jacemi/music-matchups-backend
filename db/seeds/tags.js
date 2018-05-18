const faker = require('faker');
const COUNT = 50;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorite_tag')
    .then(function () {
      const favoriteTags = [];
      for (let index = 0; index < COUNT; index++) {
        const favoriteTag = {};
        favoriteTag.name = faker.random.arrayElement([
          'Acid Jazz',
          'Crust Punk',
          'Math Rock',
          'Grunge',
          'IDM',
          'Ambient',
          'Grime',
          'Baroque',
          'Shoegaze',
          'Motown'
        ]);
        favoriteTag.created_at = faker.date.past(2);
        favoriteTag.user_account_id = faker.random.number({ min: 1, max: 20});
        favoriteTags.push(favoriteTag);
      }
      return knex('favorite_tag').insert(favoriteTags);
    });
};