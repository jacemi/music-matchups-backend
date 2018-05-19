const faker = require('faker');
const COUNT = 40;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      const posts = [];
      for (let index = 0; index < COUNT; index++) {
        const post = {};
        post.content = faker.lorem.paragraph();
        post.created_at = faker.date.past(2);
        post.user_account_id = faker.random.number({ min: 1, max: 20});
        posts.push(post);
      }
      return knex('post').insert(posts);
    });
};