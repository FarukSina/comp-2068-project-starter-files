const { index, show, create, update, destroy } = require('../controllers/books');
const passport = require('passport');

module.exports = router => {
  router.get('/books', index);
  router.get('/books/:id', passport.authenticate('jwt', { session: false }), show);
  router.post('/books', passport.authenticate('jwt', { session: false }), create);
  router.post('/books/update/:id',passport.authenticate('jwt', { session: false }), update);
  router.post('/books/destroy/:id',passport.authenticate('jwt', { session: false }), destroy);
};