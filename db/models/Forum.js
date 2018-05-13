const bookshelf = require('./bookshelf');


class Thread extends bookshelf.Model {
  get tableName() { return 'threads' }
  get hasTimestamps() { return true }

  poster() {
    return this.belongsTo('User', 'user_id')
  }
}

module.exports = bookshelf.model('Thread', Thread);