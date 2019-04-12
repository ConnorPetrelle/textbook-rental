var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('handlebars');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var _ = require("underscore");
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var _DATA = dataUtil.loadData().books;

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */


// Handlebars Helpers
handlebars.registerHelper('ifPlural', function(length, options) {
  if (length > 1)
    return options.fn(this);
  else
    return options.inverse(this);
}); 

// Express get requests
app.get('/',function(req,res){
  var d = _.sortBy(_DATA, function(book) { return book.date_posted })
  res.render('home', {
    data: d.reverse()
  });
})

app.get('/price', function(req,res) {
  res.render('home', {
    data: _.sortBy(_DATA, function(book) { return book.price })
  });
});

app.get('/condition', function(req,res) {
  var d = _.sortBy(_DATA, function(book) { return book.condition })
  res.render('home', {
    data: d.reverse()
  });
});

app.get('/rental', function(req,res) {
  res.render('home', {
    data: _.filter(_DATA, function(book) { return book.rent })
  });
});

app.get('/purchase', function(req,res) {
  res.render('home', {
    data: _.filter(_DATA, function(book) { return !book.rent })
  });
});

app.get('/alphabetical', function(req, res) {
  res.render('home', {
   data : _.sortBy(_DATA, function(book) { return book.name })
  });
})

app.get('/api/alphabetical', function(req,res) {
  var val = _.sortBy(_DATA, function(book) { return book.name })
  res.json(val)
  //res.render('home-json', val);
});

app.get('/add-book', function(req, res) {
  res.render('add-book')
})

app.post('/api/add-book', function(req, res) {
  var body = {};

  body.id = _DATA.length + 1;  
  body.name = req.body.name;
  body.price = isNaN(parseFloat(req.body.price)) ? req.body.price : parseFloat(req.body.price);
  body.condition = req.body.condition ? (isNaN(parseInt(req.body.condition)) ? req.body.condition : parseInt(req.body.condition) ): '';
  body.courses = req.body.courses ? req.body.courses.split(",") : [];
  body.email = req.body.email ? req.body.email : '';
  body.date_posted = String(new Date().toJSON());

  body.rent = req.body.rent != null;

  if (body.rent) {
    let year = req.body.year
    let month = parseInt(req.body.month) < 10 ? '0' + req.body.month : req.body.month
    let day = parseInt(req.body.day) < 10 ? '0' + req.body.day : req.body.day

    body.return_date = year + "-" + month + "-" + day + "T23:59:59.999Z";
  }
  else
    body.return_date = null;

  _DATA.push(body)
  dataUtil.saveData(_DATA)
  res.redirect("/")
})

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});


