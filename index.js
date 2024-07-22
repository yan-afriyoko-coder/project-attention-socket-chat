const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');


  socket.on('joinRoom', ({ room }) => {
    console.log('join room', room)
    socket.join(room);
  });

  socket.on('sendMessage', async ({ room, sender, message }) => {
    console.log('incomming message', sender, message, room)

    // io.to(room).emit('message', message);
    socket.broadcast.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});