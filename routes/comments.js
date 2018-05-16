const express = require('express');
const router = express.Router();

const Comment = require('../db/models/Comment.js');

router.route('/')
.get((req, res) => {
    return new Comment
    .fetchAll()
    .then(comment => {
      return res.json(comment)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
  const { user_account } = req;
  let { content } = req.body;
  return new Comment({ content, user_account_id: user_account.id })
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
  .fetch()
  .then(comment => {
    return res.json(comment)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  })
})
.put((req, res) => {
  const { user_account } = req;
  let { content } = req.body;
  return new Comment({ content, user_account_id: user_account.id })

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