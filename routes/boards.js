const express = require('express');
const router = express.Router();

const Thread = require('../db/models/Thread.js');

router.route('/')
.get((req, res) => {
    return new Thread
    .fetchAll({ withRelated: ['poster'] })
    .then(gallery => {
      if (gallery === null) throw new Error('Something up');
      gallery = gallery.toJSON();
      return res.render('index', { gallery })
    })
    .catch(err => {
      return res.json(err);
    });
})