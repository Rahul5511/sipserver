const io = require("socket.io")(3002, {
    cors: {
        origin: "*", // Allow all origins during development
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Listen for signaling events
    socket.on("offer", (data) => {
        console.log("Offer received from:", socket.id);
        socket.broadcast.emit("offer", data); // Broadcast to other clients
    });

    socket.on("answer", (data) => {
        console.log("Answer received from:", socket.id);
        socket.broadcast.emit("answer", data);
    });

    socket.on("ice-candidate", (data) => {
        console.log("ICE Candidate received from:", socket.id);
        socket.broadcast.emit("ice-candidate", data);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

console.log("Signaling server running on port 3002");
