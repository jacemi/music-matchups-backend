const express = require('express');
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const favoriteArtists = require('./favoriteArtists');
const favoriteTags = require('./favoriteTags');
const User = require('../db/models/User.js');

const router = express.Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments); 
router.use('/favoriteArtists', favoriteArtists);
router.use('/favoriteTags', favoriteTags); 

// router.route('/').get((req, res) => {
// res.send('smoke test')
//   });

// router.route('/register')
// .post((req, res) => {
//   console.log('ARE YOU HERE?!')
//   console.log('THISSSS ISSS REQQQQQQ', req.body); 
//   let { username, email, password, first_name, last_name, location, age } = req.body;
//       return new User({ username, email, password, first_name, last_name, location, age })
//       .save()
//       .then(user => {
//         return res.json(user)
//       })
//       .catch(err => {
//         return res.status(500).json({ message: err.message });
//       });
//     });

// router.route('/login')

module.exports = router;
