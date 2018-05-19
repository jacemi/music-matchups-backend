const express = require('express');
const router = express.Router();
const request = require('request');
const apiKey = process.env.apiKey;
const FavoriteArtist = require('../db/models/FavoriteArtist.js');


function getSimilarArtists(url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        console.log('youve got an error dude')
        return reject(error);
      } else {
        console.log('you made it to response')
        return resolve(response);
      }
    })
  })
}

router.route('/')
  .get((req, res) => {
    return FavoriteArtist
      .fetchAll()
      .then(favoriteArtist => {
        return res.json(favoriteArtist)
      })
      .catch(err => {
        return res.json(err);
      });
  })
  .post((req, res) => {
    let { name, similar_artists, mbid, user_account_id } = req.body;
    let similarArtistRequestURL = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${name}&api_key=${apiKey}&format=json&limit=10`;

    return getSimilarArtists(similarArtistRequestURL)
      .then(data => {
        let similar_artists = data.body;
        return new FavoriteArtist({ name, similar_artists, mbid, user_account_id })
          .save();
      })
      .then(favoriteArtist => {
        return res.json(favoriteArtist)
      })
      // const { user_account } = req;
      .catch(err => {
        return res.status(500).json({ message: err.message });
      });
  });

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    return new FavoriteArtist()
      .where({ id })
      .fetch()
      .then(favoriteArtist => {
        let artistArray = favoriteArtist.attributes.similar_artists.similarartists.artist;
        console.log('ARTIST ARRAY', artistArray); 
       for(let i = 0; i < artistArray.length; i++){
         console.log('for loop', artistArray[i].name);
       }
        console.log(favoriteArtist.attributes);
        console.log('how many layers???', favoriteArtist.attributes.similar_artists);
        return res.json(favoriteArtist)
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      })
  })
  .put((req, res) => {
    // const { user_account } = req;
    const { id } = req.params;
    let { name, similar_artists, mbid, user_account_id } = req.body;
    let similarArtistRequestURL = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${name}&api_key=${apiKey}&format=json&limit=10`;

    return getSimilarArtists(similarArtistRequestURL)
    .then(data => {
      let similar_artists = data.body;
      return new FavoriteArtist()
        .where({ id })
        .save({ name, similar_artists, mbid, user_account_id }, { method: 'update' });
    })
    .then(favoriteArtist => {
      return res.json(favoriteArtist)
    })
    .catch(err => {
      return res.status(500).json({ message: err.message });
    });
  })
  .delete(isAuthorized, (req, res) => {
    const { id } = req.params;
    return new FavoriteArtist({ id })
      .destroy()
      .then(favoriteArtist => {
        return res.json(favoriteArtist);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
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
  
    return new FavoriteArtist()
      .where({ id })
      .fetch()
      .then(favoriteArtist => {
        if (favoriteArtist === null) return res.status(404);
        favoriteArtist = favoriteArtist.toJSON();
        if (user.id !== favoriteArtist.user_account_id) return res.status(401);
        return next();
      })
      .catch(err => {
        console.log(err);
        return next();
      });
  }

module.exports = router;