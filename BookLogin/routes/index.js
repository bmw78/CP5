var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

router.get('/books', function(req, res, next) {
  Book.find(function(err, books){
    if(err){ return next(err); }
    res.json(books);
  });
});

router.get('/books/:book', function(req, res) {
  res.json(req.book);
});

router.post('/books', function(req, res, next) {
  var book = new Book(req.body);
  book.save(function(err, book){
    if(err){ return next(err); }
    res.json(book);
  });
});

router.param('book', function(req, res, next, id) {
  Book.findById(id, function (err, book){
    if (err) { return next(err); }
    if (!book) { return next(new Error("can't find book")); }
    req.book = book;
    return next();
  });
});

router.put('/books/:book/upvote', function(req, res, next) {
  req.book.upvote(function(err, book){
    if (err) { return next(err); }
    res.json(book);
  });
});

router.delete('/books/:book', function(req, res) {
  console.log("in Delete");
  req.book.remove();
  res.sendStatus(200);
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


