const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
    get tableName() { return 'user_account' }
    get hasTimestamps() { return true }
  
    posts() {
      return this.hasMany('Post', 'user_id')
    }
  }
  
  module.exports = bookshelf.model('User', User);
  