const faker = require('faker');
const COUNT = 20;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_account')
    .then(function () {
      const users = [];
      for (let index = 0; index < COUNT; index++) {
        const user = {};
        user.username = faker.name.lastName();
        user.email = faker.internet.email();
        user.password = 'password';
        user.first_name = faker.name.firstName();
        user.last_name = faker.name.lastName();
        user.location = faker.address.city();
        user.age = faker.random.number(99);
        user.created_at = faker.date.past(2);
        user.profile_picture = faker.image.avatar();
        users.push(user);
      }
      return knex('user_account').insert(users);
    });
};