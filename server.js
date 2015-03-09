var http = require('http');
var ecstatic = require('ecstatic');
var server = http.createServer(ecstatic('public'));
server.listen(process.env.PORT || 3000);

var cfg = require('./config.json');
var tw = require('node-tweet-stream')(cfg);

var title = '#' + process.argv[2];
tw.track(title);

var io = require('socket.io').listen(server);
tw.on('tweet', function(tweet){
  if (tweet.entities.media) {
    io.emit('img', tweet.entities.media[0].media_url);
  }
});

io.on('connection', function(socket) {
  socket.emit('title', 'Ignite Board - ' + title);
});

tw.on('tweet', function(tweet){
  if (tweet.entities.media) {
    io.emit('img', tweet.entities.media[0].media_url);
  }
});

io.on('connection', function(socket) {
  socket.emit('title', 'Ignite Board - ' + title);
});