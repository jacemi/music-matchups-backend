const bookshelf = require('./bookshelf');


class Status extends bookshelf.Model {
  get tableName() { return 'status' }
  get hasTimestamps() { return true }


  forums() {
    return this.hasMany('Forum', 'status')
  }
  threads() {
      return this.hasMany('Thread', 'status')
  }
  posts() {
      return this.hasMany('Post', 'status')
  }
}

module.exports = bookshelf.model('Status', Status);