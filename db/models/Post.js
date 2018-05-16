const bookshelf = require('./bookshelf');


class Post extends bookshelf.Model {
  get tableName() { return 'post' }
  // get hasTimestamps() { return true }


  poster() {
    return this.belongsTo('User', 'user_account_id')
  }
  childComments() {
    return this.hasMany('Comment', 'post_id')
  };
  // postStatus() {
  //   return this.belongsTo('Status', 'status');
  // }
  // parentThread() {
  //   return this.belongsTo('Thread', 'thread_id')
  // }
}

module.exports = bookshelf.model('Post', Post);