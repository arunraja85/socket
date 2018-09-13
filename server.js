function bootstrapSocketServer(io) {
	io.on('connection', () => {
	});
}


// io.on('connection',(socket)=>{
// 	socket.on('message',(message) =>{
// 	  socket.broadcast.emit('card received-message',message);
// 	})
  
// 	socket.on('subscribe',(channel) =>{
// 	  socket.join('room',channel);
// 	})
//   })
module.exports = bootstrapSocketServer;
