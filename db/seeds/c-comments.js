const faker = require('faker');
const COUNT = 60;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      const comments = [];
      for (let index = 0; index < COUNT; index++) {
        const comment = {};
        comment.content = faker.lorem.paragraph();
        comment.created_at = faker.date.past(2);
        comment.user_account_id = faker.random.number({ min: 1, max: 20});
        comment.post_id = faker.random.number({ min: 1, max: 40});
        comments.push(comment);
      }
      return knex('comment').insert(comments);
    });
};