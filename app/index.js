var app = require('vbridge');
var h = require('vbridge').h;
var state = app.state({
  title: 'Ignite Board',
  img: '/images.jpg'
});
app(document.body, state, function render(state) {
  return h('div', [
    h('h1', state.get('title')),
    h('img.full', { src: state.get('img') })
  ]);
});

var io = require('socket.io-client')(window.location.href);

io.on('img', function(imgUrl) {
  console.log(imgUrl);
  state.set('img', imgUrl);
});

io.on('title', function(title) {
  state.set('title', title);
});