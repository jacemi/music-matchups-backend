const express = require('express');
const router = express.Router();
const apiKey = process.env.apiKey;
const FavoriteTag = require('../db/models/FavoriteTag.js');

router.route('/')
.get(isAuthenticated, (req, res) => {
    return FavoriteTag
    .fetchAll()
    .then(favoriteTag => {
      return res.json(favoriteTag)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post(isAuthenticated, (req, res) => {
  // const { user_account } = req;
  let { name, similar_tags, user_account_id } = req.body;
  let similarTagRequestURL = `http://ws.audioscrobbler.com/2.0/?method=tag.getsimilar&tag=${name}&api_key=${apiKey}&format=json&limit=10`;

  function getSimilarTags(url) {
    return new Promise((resolve, reject) => {
      request(url, function (error, response, body) {
        if (error) {
    
          return reject(error);
        } else {

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
.get(isAuthenticated, (req, res) => {
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
.put(isAuthorized, (req, res) => {
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
.delete(isAuthorized, (req, res) => {
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

function isAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.redirect('/');
  return next();
};

function isAuthorized(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/login');

  const { user } = req;
  const { id } = req.params;

  return new FavoriteTag()
    .where({ id })
    .fetch()
    .then(favoriteTag => {
      if (favoriteTag === null) return res.status(404);
      favoriteTag = favoriteTag.toJSON();
      if (user.id !== favoriteTag.user_account_id) return res.status(401);
      return next();
    })
    .catch(err => {
      console.log(err);
      return next();
    });
}

module.exports = router;