const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('adminCommand', (data) => {
    const { command, message } = data;
    if (command === 'updateServers') io.emit('serverUpdate');
    if (command === 'resetLeaderboard') io.emit('leaderboardReset');
    if (command === 'globalMessage') io.emit('globalMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
