const bookshelf = require('./bookshelf');


class FavoriteArtist extends bookshelf.Model {
  get tableName() { return 'favorite_artist' }
  // get hasTimestamps() { return true }


  favoriter() {
    return this.belongsToMany('User')
  }
}

module.exports = bookshelf.model('FavoriteArtist', FavoriteArtist);