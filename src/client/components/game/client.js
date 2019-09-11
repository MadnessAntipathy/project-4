import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000/');
// window.location.hostname
function updateState(cb){
  socket.on('state', data=>cb(data))
}
export { updateState };

function newPlayer(cb){
  socket.emit('newPlayer', cb);
}
export { newPlayer };

function sendMoveData(cb) {
  socket.emit('sendMoveData', cb);
}
export { sendMoveData };

function getScore(cb){
  socket.on('score', data=>cb(data))
}
export { getScore };

function scoreIsReady(){
  socket.emit('scoreIsReady')
}
export { scoreIsReady };

function globalScoreUpdate(cb){
  socket.on('globalScore', ()=>cb())
}
export { globalScoreUpdate };

function disconnectGame(){
  socket.emit('disconnectClient')
}
export { disconnectGame };
