import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');


function updateState(cb){
  socket.on('state', data=>cb(null,data))
}
export { updateState };






function sendMoveData(cb) {
  socket.emit('sendMoveData', cb);
}
export { sendMoveData };
