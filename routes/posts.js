const express = require('express');
const router = express.Router();

const Post = require('../db/models/Post.js');

router.route('/')
.get((req, res) => {
    return new Post
    .fetchAll({ withRelated: ['childComments'] })
    .then(post => {
      return res.json(post)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
  const { user_account } = req;
  let { content } = req.body;
  return new Post({ content, user_account_id: user_account.id })
  .save()
  .then(post => {
    return res.json(post)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  });
});

router.route('/:id')
.get((req, res) => {
  const { id } = req.params;
  return new Post()
  .where({id})
  .fetch({ withRelated: ['childComments'] })
  .then(post => {
    return res.json(post)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  })
})
.put((req, res) => {
  const { user_account } = req;
  let { content } = req.body;
  return new Post({ content, user_account_id: user_account.id })

})
.delete((req, res) => {
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

module.exports = router;