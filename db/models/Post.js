const bookshelf = require('./bookshelf');


class Post extends bookshelf.Model {
  get tableName() { return 'posts' }
  get hasTimestamps() { return true }

  poster() {
    return this.belongsTo('User', 'user_id')
  }
}

module.exports = bookshelf.model('Post', Post);