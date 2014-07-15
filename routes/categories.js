var express = require('express');
var router = express.Router();
var Category = require('./../models/category');

router.get('/', function (req, res) {
    res.redirect('/categories/list');
});

router.get('/list', function (req, res) {
    Category.find(function (err, categories) {
        res.render('categories/list', { categories: categories });
    });
});

router.get('/create', function (req, res) {
    res.render('categories/create');
});

router.post('/create', function (req, res) {
    Category.create(req.body, function(err, category) {
        if (err) return console.error(err);
        console.log('Created ' + category.title + ' category.');
        res.redirect('/categories/list');
    })
});

module.exports = router;