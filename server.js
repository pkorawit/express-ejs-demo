var data = require('./data.js');
const pgp = require('pg-promise')();
var db = pgp('postgres://nkwnjxuiidwrns:b72b4de42f726173c9acee8a85dd10ed1c8dc1a2ab7402a6feebbbccb8b14f85@ec2-54-163-245-44.compute-1.amazonaws.com:5432/d34ii1v5fr4h1e?ssl=true');

// server.js
// load the things we need
var express = require('express');
var app = express();

// // set the view engine to ejs
app.set('view engine', 'ejs');

// define static folder
app.use(express.static('static'))


// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about', {
        profile : data.profile
    });
});

// products page 
app.get('/products', function(req, res) {
    db.any('select * from products')
          .then(function (data) {
            console.log('DATA:', data)
            res.render('pages/product', {               
                products : data
            });
          })
          .catch(function (error) {
            console.log('ERROR:', error)
          })                
});

// products detail page 
app.get('/products/detail/:pid', function(req, res) {
    db.any('select * from products where id =' + req.params.pid)
          .then(function (data) {
            console.log('DATA:', data)
            res.render('pages/detail', {               
                product : data[0]
            });
          })
          .catch(function (error) {
            console.log('ERROR:', error)
          })                
});

// products edit page 
app.get('/products/edit/:pid', function(req, res) {
    db.any('select * from products where id =' + req.params.pid)
          .then(function (data) {
            console.log('DATA:', data)
            res.render('pages/edit', {               
                product : data[0]
            });
          })
          .catch(function (error) {
            console.log('ERROR:', error)
          })                
});

// products add page 
app.get('/products/add', function(req, res) {
    res.render('pages/addnew');       
});


// download
app.get('/download', function(req, res) {
    res.download('static/index.html');
});

// download
app.get('/link', function(req, res) {
    res.redirect('/product');
});

// download
app.get('/param', function(req, res) {
    console.log(req.param('id'));
    res.end();
});

app.listen(8088);
console.log('8088 is the magic port');