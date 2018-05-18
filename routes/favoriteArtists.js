const express = require('express');
const router = express.Router();
const request = require('request');
const apiKey = process.env.apiKey;
const FavoriteArtist = require('../db/models/FavoriteArtist.js');

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
    return new FavoriteArtist()
      .where({ id })
      .save({ name, similar_artists, mbid, user_account_id }, { method: 'update' })
      .then(favoriteArtist => {
        return res.json(favoriteArtist)
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  })
  .delete((req, res) => {
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

module.exports = router;