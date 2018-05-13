// Update with your config settings.
const path = require('path');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'music_meetups_superuser',
      password: 'Mus!cW33bLord420',
      database: 'music_meetups',
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
