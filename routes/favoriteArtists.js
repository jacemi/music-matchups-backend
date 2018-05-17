const express = require('express');
const router = express.Router();
const request = require('request');

const FavoriteArtist = require('../db/models/FavoriteArtist.js');

router.route('/')
.get((req, res) => {
    return FavoriteArtist.fetchAll()
    .then(favoriteArtist => {
      return res.json(favoriteArtist)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
  let { name, similar_artists, mbid, user_account_id } = req.body;
function similarArtists(){
  return new Promise((resolve, reject) => {
    request(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${name}&api_key=728be169b3cbb61c15ea35bdfc79e517&format=json&limit=10`, function(error, response, body){
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    })
  })
}
const getSimilarArtists = similarArtists();
getSimilarArtists
.then(data => {
  console.log('DATA IN GETSIMILARARTISTS', data);
})
.catch(err => {
  console.log('ERROR IN GETSIMILARARTISTS', err);
})


  // const { user_account } = req;
  // return new FavoriteArtist({ name, similar_artists, mbid, user_account_id }, result)
  // .save()
  // .then(favoriteArtist => {
  //   return res.json(favoriteArtist)
  // })
  // .catch(err => {
  //   return res.status(500).json({ message: err.message });
  // });
});

router.route('/:id')
.get((req, res) => {
  const { id } = req.params;
  return new FavoriteArtist()
  .where({id})
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