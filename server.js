const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "https://logo-freelancer-simulator.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// Root route to confirm backend is running
app.get("/", (req, res) => {
  res.send("Logo Freelancer Simulator backend is running.");
});

const io = new Server(server, {
  cors: {
    origin: "https://logo-freelancer-simulator.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Dummy in-memory leaderboard data (resettable)
let leaderboard = [
  { player: "Alice", score: 100 },
  { player: "Bob", score: 80 },
];

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Admin: update servers command
  socket.on("admin:updateServers", () => {
    console.log("Update servers command received from:", socket.id);
    // TODO: Add your server update logic here

    // Notify all clients server was updated
    io.emit("updateServers");
  });

  // Admin: reset leaderboard command
  socket.on("admin:resetLeaderboard", () => {
    console.log("Reset leaderboard command received from:", socket.id);

    // Clear leaderboard data (in-memory)
    leaderboard = [];

    // Notify all clients leaderboard has been reset
    io.emit("leaderboardReset");
  });

  // Admin: send global message command
  socket.on("admin:globalMessage", (payload) => {
    console.log("Global message from admin:", payload.message);

    // Broadcast global message to all clients
    io.emit("globalMessage", payload.message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
