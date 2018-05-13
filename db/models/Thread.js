const bookshelf = require('./bookshelf');


class Thread extends bookshelf.Model {
  get tableName() { return 'threads' }
  get hasTimestamps() { return true }

  poster() {
    return this.belongsTo('User', 'user_account_id')
  }
  threadStatus() {
    return this.belongsTo('Status', 'status')
  }
  parentForum () {
    return this.belongsTo('Forum', 'forum_id')
  }
  posts() {
    return this.hasMany('Post', 'thread_id')
  }
}

module.exports = bookshelf.model('Thread', Thread);