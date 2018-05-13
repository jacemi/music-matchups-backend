const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
    get tableName() { return 'user_account' }
    get hasTimestamps() { return true }
  
    threads() {
      return this.hasMany('Thread', 'user_account_id')
    }
    posts() {
      return this.hasMany('Post', 'user_account_id' )
    }
    forums() {
      return this.hasMany('Forum', 'user_account_id')
    }
    favoriteArtists() {
      return this.hasMany('FavoriteArtist', 'user_account_id')
    }
    status() {
      return this.hasOne('Status', 'user_status')
    }
  }
  
  module.exports = bookshelf.model('User', User);
  