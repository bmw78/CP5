var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Book = mongoose.model('Book');

router.get('/books', function(req, res, next) {
    Book.find(function(err, books) {
        if (err) { return next(err); }
        res.json(books);
    });
});

router.get('/books/:book', function(req, res) {
    res.json(req.book);
});

router.post('/books', function(req, res, next) {
    var book = new Book(req.body);
    book.save(function(err, book) {
        if (err) { return next(err); }
        res.json(book);
    });
});

router.param('book', function(req, res, next, id) {
    Book.findById(id, function(err, book) {
        if (err) { return next(err); }
        if (!book) { return next(new Error("can't find book")); }
        req.book = book;
        return next();
    });
});

router.put('/books/:book/upvote', function(req, res, next) {
    req.book.upvote(function(err, book) {
        if (err) { return next(err); }
        res.json(book);
    });
});

router.delete('/books/:book', function(req, res) {
    console.log("in Delete");
    req.book.remove();
    res.sendStatus(200);
});

router.delete('/books', function(req, res) {
    console.log("In Delete All");
    Book.deleteMany({}, function(err) {
        if (err) {
            return console.log(err);
        }
    });
    res.sendStatus(200);
});



/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('login.html', { root: 'public' });
});

router.get('/users', function(req, res, next) {
    console.log("In GET Valid User Login");
    var usernameTemp = req.query["un"];
    var passwordTemp = req.query["pr"];

    var obj = {};
    if (usernameTemp) {
        obj = { username: usernameTemp };
    }

    User.find(obj, function(err, users) {
        if (err) {
            return res.sendStatus(500);
            //return next(err); 
        }
        else {
            if (users.length == 0)
            {
                return res.sendStatus(400);
            }
            var user = users[0];
            if (user.password == passwordTemp) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }


            //res.json(users);
        }
    });
});


router.param('user', function(req, res, next, id) {
    console.log("ID: " + id);
    var query = User.findById(id);
    console.log("Q: " + query);
    query.exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) { return next(new Error("can't find user")); }
        req.user = user;
        return next();
    });
});

router.get('/users/:user', function(req, res) {
    console.log("In GET Valid User Verify.");
    res.json(req.user);
});

router.post('/users', function(req, res, next) {
    console.log("POST User route");
    var user = new User(req.body);
    var name = user.username;
    var obj = {};
    if (name) {
        obj = { username: name };
    }

    User.find(obj, function(err, users) {
        if (err) {
            console.log(err);
        }
        //console.log(users);

        if (users.length > 0) {
            console.log("Register: Duplicate user.");
            console.log(users);
            return res.sendStatus(500);
        }
        else {
            user.save(function(err, user) {
                if (err) {
                    return next(err);

                }
                else {
                    res.json(user);
                }
            });
            console.log("User Registered");
        }


    });

});

router.delete("/users", function(req, res) {
    console.log("In Delete Route.");
    if (req.query.authority == "Execute Order 66 - P") {
        console.log("Clearing Database.");
        User.deleteMany({}, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("Database cleared")
        });
        res.sendStatus(200);
    }
    else {
        res.sendStatus(403);
    }
});




module.exports = router;
