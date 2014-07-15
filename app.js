var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var userRouter = require('./routes/user');
var articlesRouter = require('./routes/articles');
var categoriesRouter = require('./routes/categories');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');

app.set('view engine', 'jade');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);

mongoose.connect('mongodb://sumerokr:sumepass@kahana.mongohq.com:10059/sumebox');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    console.log('connection open');
});

// ===========================================================================
app.listen(port);
console.log('node running on port :' + port);
