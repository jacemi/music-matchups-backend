const faker = require('faker');
const COUNT = 50;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorite_tag').del()
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
        favoriteTags.push(favoriteTag);
      }
      return knex('favorite_tag').insert(favoriteTags);
    });
};