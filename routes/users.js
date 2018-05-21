const express = require('express');
const router = express.Router();

const User = require('../db/models/User.js');

router.route('/')
  .get((req, res) => {
      console.log(req);
      return User
      .fetchAll({ withRelated: ['posts', 'comments','favoriteArtists'] })
      .then(user => {
        return res.json(user)
      })
      .catch(err => {
        return res.json(err);
      });
  })
  // let currentUser= new User()
  //       .where({ id })
  //       .fetch({ withRelated: ['favoriteArtists'] })
      //       .then(user => {
      //         return user;
      //       })
      //     let otherUsers = User.query(function (qb) {
      //       qb.where('id', '!=', id);
      //     }).fetchAll({ withRelated: ['favoriteArtists'] })
      //       .then(user => {
      //         return user;
      //       });
      //       Promise.all([currentUser, otherUsers])
      //       .then(user => {
      //         console.log('PROMISE USER');
      //         currentUser = user[0];
      //         otherUsers = user[1];
      //         const currentUserArtists = currentUser.relations.favoriteArtists.models;
      //         console.log(currentUserArtists);
      //         const similarArtistArray = favoriteArtist.attributes.similar_artists.similarartists.artist;
      //         console.log(similarArtistArray);
      //         for(let i = 0; i < currentUserArtists.length; i++){
      //           console.log('each artist attributes', currentUserArtists[i].attributes);
      //           console.log('each artist name', currentUserArtists[i].attributes.name);
      //           for(let z = 0; z < favoriteArtist.attributes.similar_artists.similarartists.artist.length; z++){
      //             console.log("each artist similar", favoriteArtist.attributes.similar_artists.similarartists.artist[z].name);

      //           }
      //         }
      // console.log('currentUser', currentUser.relations.favoriteArtists);
      // for(let i = 0; i < otherUsers.length)
      // console.log('otherUsers', otherUsers);


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
        qb.distinct('user_account_id').from('favorite_artist_user_account').whereIn('favorite_artist_id', [1, 2])
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





// .post((req, res) => {
//   const { user_account } = req;
//   let { subject } = req.body;
//   return new Forum({ subject, user_account_id: user_account.id })
//   .save()
//   .then(forum => {
  //     return res.json(forum)
  //   })
  //   .catch(err => {
    //     return res.status(500).json({ message: err.message });
    //   });
    // });
    router.route('/profile')
      .get((req, res) => {
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
      // .put( (req, res) => {
      //   const { id } = req.user;
      //   const { email, username, first_name, last_name, location, age } = req.body;
      //   return new User()
      //   .where({ id })
      //   .save({ email, username, first_name, last_name, location, age }, { method: 'update' })
      //   .then(post => {
      //     return res.json(post)
      //   })
      //   .catch(err => {
      //     return res.status(500).json(err);
      //   });
      // })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    console.log('WHAT IS ID??', req);
    return new User()
      .where({ id })
      .fetch({ withRelated: ['favoriteArtists'] })
      .then(user => {
        console.log(user);
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