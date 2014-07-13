var express = require('express');
var router = express.Router();
var Article = require('./../models/article');

router.get('/', function (req, res) {
    res.redirect('/articles/list');
});

router.get('/list', function (req, res) {
    Article.find(function (err, articles) {
        res.render('articles/list', { articles: articles });
    });
});

router.get('/create', function (req, res) {
    res.render('articles/create');
});

router.post('/create', function (req, res) {
    Article.create(req.body, function(err, article) {
        if (err) return console.error(err);
        console.log('Created ' + article.title + ' article.');
        res.redirect('/articles/list');
    })
});

router.get('/tag/:tag', function (req, res) {
    Article.find({ tags: req.params.tag }, function (err, articles) {
        res.render('articles/list', { articles: articles });
    });
});

module.exports = router;