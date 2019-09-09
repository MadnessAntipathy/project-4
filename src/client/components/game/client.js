import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.173.63:3000');

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

function globalScoreUpdate(cb){
  socket.on('globalScore', data=>cb(data))
}
export { globalScoreUpdate };

function disconnectGame(){
  socket.emit('disconnectClient')
}
export { disconnectGame };
