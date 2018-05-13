const bookshelf = require('./bookshelf');


class UserStatus extends bookshelf.Model {
  get tableName() { return 'user_status' }
  get hasTimestamps() { return true }


  users() {
    return this.hasMany('User', 'user_status')
  }
}

module.exports = bookshelf.model('UserStatus', UserStatus);