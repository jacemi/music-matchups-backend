const express = require('express');
const users = require('./users');
const boards = require('./boards');
const articles = require('./articles');

const router = express.Router();

router.use('/users', users);
router.use('/boards', boards);

router.route('/').get((req, res) => {
    return Gallery.fetchAll({ withRelated: ['poster'] })
      .then(gallery => {
        if (gallery === null) throw new Error('Something up');
        gallery = gallery.toJSON();
        return res.render('index', { gallery })
      })
      .catch(err => {
        return res.json(err);
      });
  });


module.exports = router;
