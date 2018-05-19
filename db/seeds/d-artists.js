const faker = require('faker');
const COUNT = 50;

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorite_artist').del()
    .then(function () {
      const favoriteArtists = [
        { mbid: 'a74b1b7f-71a5-4011-9441-d0b5e4122711', name: 'radiohead' },
        { mbid: '6e855495-c063-4052-a26d-959c3f226c87', name: 'mutemath' },
        { mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d', name: 'foo fighters' },
        { mbid: 'a96ac800-bfcb-412a-8a63-0a98df600700', name: 'modest mouse' },
        { mbid: '0743b15a-3c32-48c8-ad58-cb325350befa', name: 'blink-182' },
        { mbid: 'f59c5520-5f46-4d2c-b2c4-822eabf53419', name: 'linkin park' },
        { mbid: '4d436119-8d30-4804-9e0e-164b1bfaf58e', name: 'tera melos' },
        { mbid: 'bba5b8aa-02d7-453c-99fd-4f2a45987afd', name: 'toe' },
        { mbid: 'ef3a1aab-6676-4ad1-89a2-6c6bd828e0b0', name: 'lite' },
        { mbid: 'dd91eb4b-6d08-4c14-9eb2-197a02a35f6c', name: 'manchester orchestra' }
      ]
      return knex('favorite_artist').insert(favoriteArtists);
    });
}; 