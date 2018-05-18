const faker = require('faker');
const COUNT = 50;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment')
    .then(function () {
      const comments = [];
      for (let index = 0; index < COUNT; index++) {
        const comment = {};
        comment.content = faker.lorem.paragraph();
        comment.created_at = faker.date.past(2);
        comment.user_account_id = 1;
        comment.post_id = 50;
        comments.push(comment);
      }
      return knex('comment').insert(comments);
    });
};