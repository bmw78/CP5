var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

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
