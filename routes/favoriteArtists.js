const express = require('express');
const router = express.Router();

const FavoriteArtist = require('../db/models/FavoriteArtist.js');

router.route('/')
.get((req, res) => {
    return new FavoriteArtist
    .fetchAll()
    .then(favoriteArtist => {
      return res.json(favoriteArtist)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
  const { user_account } = req;
  let { content } = req.body;
  return new FavoriteArtist({ content, user_account_id: user_account.id })
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
  const { user_account } = req;
  let { content } = req.body;
  return new FavoriteArtist({ content, user_account_id: user_account.id })

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