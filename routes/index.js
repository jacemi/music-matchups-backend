const express = require('express');
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const favoriteArtists = require('./favoriteArtists');
const favoriteTags = require('./favoriteTags');

const router = express.Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments); 
router.use('/favoriteArtists', favoriteArtists);
router.use('/favoriteTags', favoriteTags); 

// router.route('/').get((req, res) => {
//     return Gallery.fetchAll({ withRelated: ['poster'] })
//       .then(gallery => {
//         if (gallery === null) throw new Error('Something up');
//         gallery = gallery.toJSON();
//         return res.render('index', { gallery })
//       })
//       .catch(err => {
//         return res.json(err);
//       });
//   });

router.route('/register')
    .post((req, res) => {
      return new User({ username: req.body.username, email: req.body.email, password: req.body.password, first_name: req.body.first_name, last_name: req.body.last_name, location: req.body.location, age: req.body.age })
      .save()
      .then(user => {
        return res.json(user)
      })
      .catch(err => {
        return res.status(500).json({ message: err.message });
      });
    });


module.exports = router;
