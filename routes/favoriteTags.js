const express = require('express');
const router = express.Router();

const FavoriteTag = require('../db/models/FavoriteTag.js');

router.route('/')
.get((req, res) => {
    return new FavoriteTag
    .fetchAll()
    .then(favoriteTag => {
      return res.json(favoriteTag)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
  const { user_account } = req;
  let { content } = req.body;
  return new FavoriteTag({ content, user_account_id: user_account.id })
  .save()
  .then(favoriteTag => {
    return res.json(favoriteTag)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  });
});

router.route('/:id')
.get((req, res) => {
  const { id } = req.params;
  return new FavoriteTag()
  .where({id})
  .fetch()
  .then(favoriteTag => {
    return res.json(favoriteTag)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  })
})
.put((req, res) => {
  const { user_account } = req;
  let { content } = req.body;
  return new favoriteTag({ content, user_account_id: user_account.id })

})
.delete((req, res) => {
  const { id } = req.params;
  return new FavoriteTag({ id })
    .destroy()
    .then(favoriteTag => {
      return res.json(favoriteTag);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
})

module.exports = router;