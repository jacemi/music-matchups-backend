const express = require('express');
const router = express.Router();

const Comment = require('../db/models/Comment.js');

router.route('/')
.get(isAuthenticated, (req, res) => {
    return Comment
    .fetchAll({ withRelated: ['parentPost', 'commenter']})
    .then(comment => {
      return res.json(comment)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post(isAuthenticated, (req, res) => {
  // const { user_account } = req;
  let { content, user_account_id, post_id } = req.body;
  return new Comment({ content, user_account_id, post_id })
  .save()
  .then(comment => {
    return res.json(comment)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  });
});

router.route('/:id')
.get(isAuthenticated, (req, res) => {
  const { id } = req.params;
  return new Comment()
  .where({id})
  .fetch({ withRelated: ['parentPost', 'commenter'] })
  .then(comment => {
    return res.json(comment)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  })
})
.put(isAuthorized, (req, res) => {
  const { id } = req.params;
  let { content, user_account_id, post_id } = req.body;
  return new Comment()
  .where({ id })
  .save({ content, user_account_id, post_id }, { method: 'update' })
  .then(comment => {
    return res.json(comment)
  })
  .catch(err => {
    return res.status(500).json(err);
  });
})
.delete(isAuthorized, (req, res) => {
  const { id } = req.params;
  return new Comment({ id })
    .destroy()
    .then(comment => {
      return res.json(comment);
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

  return new Comment()
    .where({ id })
    .fetch()
    .then(comment => {
      if (comment === null) return res.status(404);
      comment = comment.toJSON();
      if (user.id !== comment.user_account_id) return res.status(401);
      return next();
    })
    .catch(err => {
      console.log(err);
      return next();
    });
}

module.exports = router;