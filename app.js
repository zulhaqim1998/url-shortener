var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express(),
    config = require('./config.js'),
    path = require('path'),
    route = require('./routes/route.js'),
    Counter = require('./models/counter'),
    Url = require('./models/url'),
    converter = require('./converter.js');


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
mongoose.connection.on('connected', function(){
  console.log('Connected to database');
});
mongoose.connection.on('error', function(err){
  console.log('Error connectiong to database: ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, function(){
  console.log('Server starting at localhost:3000');
});

//Path routes
app.post('/api/shorten', function(req, res){
  let longUrl = req.body.url;
  let shortUrl = '';

  Url.findOne({longUrl: longUrl}, function(err, url){
    if(url){
      shortUrl = config.webhost + converter.encode(url._id);
      res.send({ shortUrl: shortUrl });
    } else {
      var newUrl = Url({ longUrl: longUrl });

      newUrl.save(function(err){
        if(err){
          return console.log(err);
        }
        shortUrl = config.webhost + converter.encode(newUrl.id);
        res.send({ shortUrl: shortUrl });
      });
    }
  });
});

app.get('/:code', function(req, res){
  var code = req.params.code;
  var id = converter.decode(code);

  Url.findOne({ _id: id }, function(err, url){
    if(url){
      res.redirect( url.longUrl );
    } else {
      res.redirect(config.webhost);
    }
  });
});
