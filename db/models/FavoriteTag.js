const bookshelf = require('./bookshelf');


class FavoriteTag extends bookshelf.Model {
  get tableName() { return 'favorite_tag' }
//   get hasTimestamps() { return true }


  favoriter() {
    return this.belongsTo('User', 'user_account_id')
  }
}

module.exports = bookshelf.model('FavoriteTag', FavoriteTag);