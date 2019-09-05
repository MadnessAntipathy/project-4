const http = require('http');
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

function onUnhandledError(err) {
  console.log('ERROR:', err);
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

const app = express();

app.set('env', process.env.NODE_ENV);

// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

require('./routes')(app, db);

// application routes (this goes last)
setupAppRoutes(app);

const logic = require('./logic/logic.js');

const io = require('socket.io')();
const port = 8000;
io.listen(port);

io.on('connection', (client) => {
  console.log("``````````````````````client.id``````````````````````",client.id)
  logic.player[client.id]={
    x:250,
    y:250,
  }
  client.emit('newplayer')

  // client.on('subscribeToTimer', (interval) => {
  //   setInterval(() => {
  //     client.emit('timer', new Date());
  //     console.log('client is subscribing to timer with interval ', interval);
  //   }, interval);
  // });

  client.on('sendMoveData', (info)=>{
    var player = logic.player[client.id] || {}
    if (info.move.up && player.y > 0){
      player.y-=5;
    }
    if (info.move.down && player.y + 10 < 500){
      player.y+=5;
    }
    if (info.move.left && player.x > 0){
      player.x-=5;
    }
    if (info.move.right && player.x + 10 < 500){
      player.x+=5;
    }
    // console.log(logic.player[client.id])
    logic.collision(player, logic.player)
    // console.log(info.userName, " is Sending DATA on ID ", info.userId, " with ", info.move)
    io.sockets.emit('state', logic.player)
  });
});


http.createServer(app).listen(process.env.PORT, () => {
  console.log(`HTTP server is now running on http://localhost:${process.env.PORT}`);
});
