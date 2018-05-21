const express = require('express');
const router = express.Router();

const User = require('../db/models/User.js');

router.route('/')
  .get(isAuthenticated, (req, res) => {
    return User
      .fetchAll({ withRelated: ['posts', 'comments', 'favoriteArtists'] })
      .then(user => {
        return res.json(user)
      })
      .catch(err => {
        return res.json(err);
      });
  })

router.route('/match')
  .get(isAuthenticated, (req, res) => {
    const { id } = req.user;
    return new User()
      .where({ id })
      .fetch({ withRelated: ['favoriteArtists'] })
      .then(user => {
        let usersArtistsArray = user.relations.favoriteArtists.models;

        let arrayOfFavArtistIds = [];
        for (let i = 0; i < usersArtistsArray.length; i++) {
          arrayOfFavArtistIds.push(usersArtistsArray[i].attributes.id)
        }
        return User.query(function (qb) {
          qb.distinct('user_account_id').from('favorite_artist_user_account').whereIn('favorite_artist_id', arrayOfFavArtistIds)
        }).fetchAll()
      })
      .then(match => {

        let arrayOfUserIds = [];
        for (let i = 0; i < match.models.length; i++) {
          arrayOfUserIds.push(match.models[i].attributes.user_account_id);
        }
        return User.query(function (qb) {
          qb.from('user_account').whereIn('id', arrayOfUserIds)
        })
          .fetchAll({ withRelated: ['posts', 'comments', 'favoriteArtists'] })
      })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        return res.json({ message: err.message });
      })

  })

router.route('/profile')
  .get(isAuthenticated, (req, res) => {
    const { id } = req.user;
    return new User()
      .where({ id })
      .fetch({ withRelated: ['posts', 'comments', 'favoriteArtists'] })
      .then(user => {
        return res.json(user)
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      })
  })


router.route('/:username')
  .get(isAuthenticated, (req, res) => {
    const { username } = req.params;
    return new User()
      .where({ username })
      .fetch({ withRelated: ['posts', 'comments', 'favoriteArtists'] })
      .then(user => {
        return res.json(user)
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      })
  })


// .put((req, res) => {
//   const { user_account } = req;
//   let { subject } = req.body;
//   return new Forum({ subject, user_account_id: user_account.id })

// })
// .delete((req, res) => {
//   const { id } = req.params;
//   return new Forum({ id })
//     .destroy()
//     .then(forum => {
//       return res.json(forum);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// })

router.route('/artistMatches')
  .get((req, res) => {

  })


function isAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.redirect('/');
  return next();
};

function isAuthorized(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/login');

  const { user } = req;
  const { id } = req.params;

  return new User()
    .where({ id })
    .fetch()
    .then(user => {
      if (user === null) return res.status(404);
      user = user.toJSON();
      if (user.id !== gallery.user_id) return res.status(401);
      return next();
    })
    .catch(err => {
      console.log(err);
      return next();
    });
}



module.exports = router;