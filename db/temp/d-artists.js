const faker = require('faker');
const COUNT = 50;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorite_artist')
    .then(function () {
      const favoriteArtists = [];
      for (let index = 0; index < COUNT; index++) {
        const favoriteArtist = {};
        favoriteArtist.name = faker.random.arrayElement([
          'Radiohead',
          'mutemath',
          'Foo Fighters',
          'Modest Mouse',
          'Blink-182',
          'Linkin Park',
          'Tera Melos',
          'toe',
          'LITE',
          'Manchester Orchestra',
        ]);
        favoriteArtist.created_at = faker.date.past(2);
        favoriteArtist.user_account_id = faker.random.number({ min: 1, max: 20});
        favoriteArtists.push(favoriteArtist);
      }
      return knex('favorite_artist').insert(favoriteArtists);
    });
};