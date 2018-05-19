const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
    get tableName() { return 'user_account' }
    // get hasTimestamps() { return true }
  

    favoriteArtists() {
      return this.belongsToMany('FavoriteArtist')
    }
    favoriteTags() {
      return this.belongsToMany('FavoriteTag')
    }
    posts() {
      return this.hasMany('Post', 'user_account_id' )
    }
    comments() {
      return this.hasMany('Comment', 'user_account_id')
    }
    // forums() {
    //   return this.hasMany('Forum', 'user_account_id')
    // }
    // status() {
    //   return this.hasOne('Status', 'user_status')
    // }
  }
  
  module.exports = bookshelf.model('User', User);
  