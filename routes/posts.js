const express = require('express');
const router = express.Router();

const Post = require('../db/models/Post.js');

router.route('/')
  .get(isAuthenticated, (req, res) => {
    return Post
      .fetchAll({ withRelated: ['poster', 'childComments'] })
      .then(post => {
        return res.json(post)
      })
      .catch(err => {
        return res.json(err);
      });
  })
  .post(isAuthenticated, (req, res) => {
    const user_account_id = req.user.id;
    const content = req.body.content;
    return new Post({ content, user_account_id })
      .save()
      .then(post => {
        return res.json(post)
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      });
  });

router.route('/:id')
  .get(isAuthenticated, (req, res) => {
    const { id } = req.params;
    return new Post()
      .where({ id })
      .fetch({ withRelated: ['poster', 'childComments'] })
      .then(post => {
        return res.json(post)
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      })
  })
  .put(isAuthorized, (req, res) => {
    const { id } = req.params;
    let { content, user_account_id } = req.body;
    return new Post()
      .where({ id })
      .save({ content, user_account_id }, { method: 'update' })
      .then(post => {
        return res.json(post)
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  })
  .delete(isAuthorized, (req, res) => {
    const { id } = req.params;
    return new Post({ id })
      .destroy()
      .then(post => {
        return res.json(post);
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

  return new Post()
    .where({ id })
    .fetch()
    .then(post => {
      if (post === null) return res.status(404);
      post = post.toJSON();
      if (user.id !== post.user_account_id) return res.status(401);
      return next();
    })
    .catch(err => {
      console.log(err);
      return next();
    });
}



module.exports = router;