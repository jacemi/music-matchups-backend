const express = require('express');
const router = express.Router();

const User = require('../db/models/User.js');

router.route('/')
  .get((req, res) => {
    console.log('GET IN USERS ROUTE');
    console.log('THIS IS REQ PARAMS', req.user);
    // const { id } = req.user;
    const id = 1;
    //   console.log('id', id);
    //     return User
    //     .fetchAll({ withRelated: ['posts', 'comments','favoriteArtists'] })
    //     .then(user => {
    //       return res.json(user)
    //     })
    // .catch(err => {
    //   return res.json(err);
    // });
    // // })
    return new User()
      .where({ id })
      .fetch({ withRelated: ['favoriteArtists'] })
      .then(user => {

        console.log('GET USER', user);
        console.log('get artists', user.relations.favoriteArtists.models[0].attributes.id)

        let usersArtistsArray = user.relations.favoriteArtists.models;

        console.log('length of arr', usersArtistsArray.length);

        let arrayOfFavArtistIds = [];
        for (let i = 0; i < usersArtistsArray.length; i++) {
          arrayOfFavArtistIds.push(usersArtistsArray[i].attributes.id)
        }

        console.log('array of fav ids', arrayOfFavArtistIds);

        return User.query(function (qb) {
          qb.distinct('user_account_id').from('favorite_artist_user_account').whereIn('favorite_artist_id', [1 , 2])
        }).fetchAll()
      })
          .then(match => {
            console.log('this is match', match.models);
            return 
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
      .catch(err => {
        return res.json({ message: err.message });
      })

  })



// .get(isAuthenticated,(req, res) => {
//     return User
//     .fetchAll({ withRelated: ['posts', 'comments','favoriteArtists'] })
//     .then(user => {
//       return res.json(user)
//     })
//     .catch(err => {
//       return res.json(err);
//     });
// })






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

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
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