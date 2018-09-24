var data = require('./data.js');
const pgp = require('pg-promise')();
var db = pgp('postgres://nkwnjxuiidwrns:b72b4de42f726173c9acee8a85dd10ed1c8dc1a2ab7402a6feebbbccb8b14f85@ec2-54-163-245-44.compute-1.amazonaws.com:5432/d34ii1v5fr4h1e?ssl=true');

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'www.db4free.net',
    user: 's140390',
    password: 'abc123**',
    database: 'db140390'
});

connection.connect()

// server.js
// load the things we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// // set the view engine to ejs
app.set('view engine', 'ejs');

// define static folder
app.use(express.static('static'))

// index page 
app.get('/', function (req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function (req, res) {
    res.render('pages/about', {
        profile: data.profile
    });
});

// products page 
app.get('/products', function (req, res) {
    db.any('select * from products')
        .then(function (data) {
            //console.log('DATA:', data)
            res.render('pages/product', {
                products: data
            });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
});

// student page 
app.get('/students', function (req, res) {
    connection.query('select * from students', function (err, rows, fields) {
        if (err) throw err
        res.render('pages/student', {
            students: rows
        });
    })
});

// subject page 
app.get('/subjects', function (req, res) {
    connection.query('select * from subjects', function (err, rows, fields) {
        if (err) throw err
        res.render('pages/subject', {
            subjects: rows
        });
    })
});

// insert new product
app.post('/products', function (req, res) {
    console.log('INSERT ' + JSON.stringify(req.body));
    res.redirect('/products');
});


// products insert page 
app.get('/products/new', function (req, res) {
    res.render('pages/insert');
});

// products detail page 
app.get('/products/detail/:pid', function (req, res) {

    db.any('select * from products where id =' + req.params.pid)
        .then(function (data) {
            //console.log('DATA:', data)
            res.render('pages/detail', {
                product: data[0]
            });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
});


// Update detail page 
app.post('/products/detail/:pid', function (req, res) {
    console.log("UPDATE:" + req.params.pid);
    res.redirect('/products');
});


// delete product  
app.post('/products/delete/:pid', function (req, res) {
    console.log('DELETE ' + req.params.pid);
    res.redirect('/products');
});

// download
app.get('/download', function (req, res) {
    res.download('static/index.html');
});

// download
app.get('/link', function (req, res) {
    res.redirect('/product');
});

// download
app.get('/param', function (req, res) {
    console.log(req.param('id'));
    res.end();
});

app.listen(8088);
console.log('8088 is the magic port');