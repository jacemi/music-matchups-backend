const express = require('express');
const router = express.Router();

const Comment = require('../db/models/Comment.js');

router.route('/')
.get((req, res) => {
    return Comment
    .fetchAll({ withRelated: ['parentPost', 'commenter']})
    .then(comment => {
      return res.json(comment)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
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
.get((req, res) => {
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
.put((req, res) => {
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
.delete((req, res) => {
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

module.exports = router;