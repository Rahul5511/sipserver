const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

// Serve a welcome message at the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the video call server!");
});

const io = new Server(server, {
  cors: {
    origin: "*", // React.js client origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("start-video-call", (data) => {
    console.log("Start video call message received:", data);
    io.emit("video-call-notification", { action: "start-video-call" }); // Notify all clients
  });

  socket.on("app-disconnect", (data) => {
    console.log("React Native app disconnected:", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
