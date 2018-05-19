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
          'radiohead',
          'mutemath',
          'foo fighters',
          'modest mouse',
          'blink-182',
          'linkin park',
          'tera melos',
          'toe',
          'lite',
          'manchester orchestra'
        ])
        favoriteArtist.mbid = faker.random.arrayElement([
          'a74b1b7f-71a5-4011-9441-d0b5e4122711', //radiohead
          '6e855495-c063-4052-a26d-959c3f226c87', //mutemath
          '67f66c07-6e61-4026-ade5-7e782fad3a5d', //foo fighters
          'a96ac800-bfcb-412a-8a63-0a98df600700',//modest mouse
          '0743b15a-3c32-48c8-ad58-cb325350befa', //blink-182
          'f59c5520-5f46-4d2c-b2c4-822eabf53419', //linkin park
          '4d436119-8d30-4804-9e0e-164b1bfaf58e', //tera melos
          'bba5b8aa-02d7-453c-99fd-4f2a45987afd', //toe
          'ef3a1aab-6676-4ad1-89a2-6c6bd828e0b0',//lite
          'dd91eb4b-6d08-4c14-9eb2-197a02a35f6c',//manchester orchestra
        ]);
        favoriteArtist.created_at = faker.date.past(2);
        favoriteArtists.push(favoriteArtist);
      }
      return knex('favorite_artist').insert(favoriteArtists);
    });
};