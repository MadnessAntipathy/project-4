import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

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

function disconnectGame(){
  socket.emit('disconnectClient')
}
export { disconnectGame };
