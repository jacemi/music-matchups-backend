const express = require('express');
const router = express.Router();

const User = require('../db/models/User.js');

router.route('/')
.get(isAuthenticated, (req, res) => {
  console.log('GET IN USERS ROUTE');
    return User
    .fetchAll({ withRelated: ['posts', 'comments','favoriteArtists'] })
    .then(user => {
      return res.json(user)
    })
    .catch(err => {
      return res.json(err);
    });
})


// .post((req, res) => {
//   const { user_account } = req;
//   let { subject } = req.body;
//   return new Forum({ subject, user_account_id: user_account.id })
//   .save()
//   .then(forum => {
//     return res.json(forum)
//   })
//   .catch(err => {
//     return res.status(500).json({ message: err.message });
//   });
// });

router.route('/:id')
.get(isAuthenticated, (req, res) => {
  const { id } = req.params;
  return new User()
  .where({id})
  .fetch({ withRelated: ['posts', 'comments', 'favoriteArtists'] })
  .then(user => {
    return res.json(user)
  })
  .catch(err => {
    return res.status(500).json({ message: err.message });
  })
})
// .put((req, res) => {
//   const { user_account } = req;
//   let { subject } = req.body;
//   return new Forum({ subject, user_account_id: user_account.id })

// })
// .delete((req, res) => {
//   const { id } = req.params;
//   return new Forum({ id })
//     .destroy()
//     .then(forum => {
//       return res.json(forum);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// })

router.route('/artistMatches')
.get((req, res) => {
  
})


function isAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.redirect('/');
  return next();
};

// function isAuthorized(req, res, next) {
//   if (!req.isAuthenticated()) return res.redirect('/login');

//   const { user } = req;
//   const { id } = req.params;

//   return new User()
//     .where({ id })
//     .fetch()
//     .then(user => {
//       if (user === null) return res.status(404);
//       user = user.toJSON();
//       if (user.id !== gallery.user_id) return res.status(401);
//       return next();
//     })
//     .catch(err => {
//       console.log(err);
//       return next();
//     });
// }



module.exports = router;