const express = require('express');
const router = express.Router();
const apiKey = process.env.apiKey;
const FavoriteTag = require('../db/models/FavoriteTag.js');

router.route('/')
.get((req, res) => {
    return FavoriteTag
    .fetchAll()
    .then(favoriteTag => {
      return res.json(favoriteTag)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
  // const { user_account } = req;
  let { name, similar_tags, user_account_id } = req.body;
  let similarTagRequestURL = `http://ws.audioscrobbler.com/2.0/?method=tag.getsimilar&tag=${name}&api_key=${apiKey}&format=json&limit=10`;

  function getSimilarTags(url) {
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
  return getSimilarTags(similarTagRequestURL)
  .then(data => {
    let similar_tags = data.body;
    return new FavoriteTag({ name, similar_tags, user_account_id })
    .save();
  })
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
  // const { user_account } = req;
  const { id } = req.params;
  let { name, similar_tags, user_account_id } = req.body;
  return new FavoriteTag()
  .where({ id })
  .save({ name, similar_tags, user_account_id }, { method: 'update' })
  .then(favoriteTag => {
    return res.json(favoriteTag)
  })
  .catch(err => {
    return res.status(500).json(err);
  });

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