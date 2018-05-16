const express = require('express');
const router = express.Router();

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
  console.log('POST IN FAV ARTISTS');
  // const { user_account } = req;
  let { name, similar_artists, mbid, user_account_id } = req.body;
  return new FavoriteArtist({ name, similar_artists, mbid, user_account_id })
  .save()
  .then(favoriteArtist => {
    return res.json(favoriteArtist)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  });
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