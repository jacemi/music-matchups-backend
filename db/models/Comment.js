const bookshelf = require('./bookshelf');


class Comment extends bookshelf.Model {
  get tableName() { return 'comment' }
//   get hasTimestamps() { return true }


  commenter() {
    return this.belongsTo('User', 'user_account_id')
  }
  // postStatus() {
  //   return this.belongsTo('Status', 'status');
  // }
  parentPost() {
    return this.belongsTo('Post', 'post_id')
  }
}

module.exports = bookshelf.model('Comment', Comment);