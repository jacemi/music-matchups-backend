const bookshelf = require('./bookshelf');


class UserFavoriteArtist extends bookshelf.Model {
  get tableName() { return 'user_favorite_artist' }
  get hasTimestamps() { return true }


  owner() {
    return this.belongsTo('User', 'user_account_id')
  }
}

module.exports = bookshelf.model('UserFavoriteArtist', UserFavoriteArtist);