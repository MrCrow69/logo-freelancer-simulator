const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Listen for admin commands from client
  socket.on('admin:updateServers', () => {
    console.log('Admin requested server update');
    io.emit('updateServers');
  });

  socket.on('admin:globalMessage', (message) => {
    console.log('Admin sent global message:', message);
    io.emit('globalMessage', message);
  });

  socket.on('admin:resetLeaderboard', () => {
    console.log('Admin reset leaderboard');
    io.emit('leaderboardReset');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
