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

module.exports = router;
