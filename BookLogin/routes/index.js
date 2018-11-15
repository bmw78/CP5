var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
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

router.get('/users', function(req, res, next) {
    var user = new User(req.body);
    
    User.find(user, function(err, users) {
        if (err) { return next(err); }
        res.json
    });
});

router.param('user', function(req, res, next, id) {
    var query = User.findById(id);
    query.exec(function(err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new Error("can't find user")); }
        req.user = user;
        return next();
    });
});

router.post('/users', function(req, res, next) {
    var user = new User(req.body);
    
    if (User.find(user, function(err, users) {
        if (err) { console.log("Register: No existing user found."); }
        else {
            return res.sendStatus(500);
        }
    }))
    
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.json(user);
    });
});




module.exports = router;


