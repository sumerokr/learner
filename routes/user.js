var express = require('express');
var router = express.Router();
var User = require('./../models/user');

router.get('/', function (req, res) {
    User.find(function (err, users) {
        if (err) return console.error(err);
        res.render('index', { jdata: users });
    });
});

router.get('/create', function (req, res) {
    res.render('create');
});

router.post('/create', function (req, res) {
    User.create(req.body, function(err, user) {
        if (err) return console.error(err);
        console.log('Created ' + user.name + ' user.');
        res.redirect('/user');
    });
});

router.get('/man/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('man', user);
    });
});

router.get('/update/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('update', { user: user });
    });
});

router.post('/update/:id', function (req, res) {
    console.log(req.params.id);
//    User.findByIdAndUpdate(req.params.id, {
//        $set: {
//            name: req.body.name,
//            age: req.body.age,
//            birthday: req.body.birthday,
//            isMale: req.body.isMale
//        }
//    }, function (err, user) {
//        if (err) {
//            res.render('update', { err: err, user: user });
//            return console.error(err);
//        }
//        console.log('Updated ' + user.name + ' user.');
//        res.redirect('/user');
//    });
    User.findById(req.params.id, function(err, user) {
        var newUser = user;
        user.name = req.body.name;
        user.age = req.body.age;
        user.birthday = req.body.birthday;
        user.isMale = req.body.isMale;
        user.save(function (err, user, num) {
            if (err) {
                res.render('update', { err: err, user: newUser });
                return console.error(err);
            }
            console.log('Updated ' + user.name + ' user.');
            res.redirect('/user');
        });
    });
});

router.get('/delete/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('delete', user);
    });
});

router.post('/delete/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return console.error(err);
        console.log('Removed ' + user.name + ' user.');
        res.redirect('/user');
    })
});

module.exports = router;