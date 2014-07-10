var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var db = require('./db');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongo;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://sumerokr:sumepass@kahana.mongohq.com:10059/sumebox');
mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function () {
    console.log('connection open');
});

// mongo
var userSchema = mongoose.Schema({
    name: String,
    age: Number
});

var User = mongoose.model('User', userSchema);

app.set('view engine', 'jade');
app.set('views', 'views');

router.get('/', function (req, res) {
    User.find(function (err, users) {
        if (err) return console.error(err);
        var model = users;
        res.render('index', { jdata: model });
    });
});

router.get('/create', function (req, res) {
    res.render('create');
});

router.post('/create', function (req, res) {
    var user = new User({ name: req.body.name, age: req.body.age });
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log('saved!');
        res.redirect('/');
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES
app.use('/', router);

// START THE SERVER
// ===========================================================================
app.listen(port);
console.log('node running on port :' + port);
