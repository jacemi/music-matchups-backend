const express = require('express');
const router = express.Router();

const Forum = require('../db/models/Forum.js');

router.route('/')
.get((req, res) => {
    return new Forum
    .fetchAll({ withRelated: ['creator', 'forumStatus', 'threads'] })
    .then(forum => {
      return res.json(forum)
    })
    .catch(err => {
      return res.json(err);
    });
})
.post((req, res) => {
  const { user_account } = req;
  let { subject } = req.body;
  return new Forum({ subject, user_account_id: user_account.id })
  .save()
  .then(forum => {
    return res.json(forum)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  });
});

router.route('/:id')
.get((req, res) => {
  const { id } = req.params;
  return new Forum()
  .where({id})
  .fetch()
  .then(forum => {
    return res.json(forum)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  })
})
.put((req, res) => {
  const { user_account } = req;
  let { subject } = req.body;
  return new Forum({ subject, user_account_id: user_account.id })

})
.delete((req, res) => {
  const { id } = req.params;
  return new Forum({ id })
    .destroy()
    .then(forum => {
      return res.json(forum);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
})