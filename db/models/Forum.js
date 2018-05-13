const bookshelf = require('./bookshelf');

class Thread extends bookshelf.Model {
  get tableName() { return 'forum' }
  get hasTimestamps() { return true }

  creator() {
    return this.belongsTo('User', 'user_account_id')
  }
  forumStatus() {
    return this.hasOne('Status', 'status');
  }
  threads() {
    return this.hasMany('Thread', 'forum_id')
  }
}

module.exports = bookshelf.model('Forum', Forum);