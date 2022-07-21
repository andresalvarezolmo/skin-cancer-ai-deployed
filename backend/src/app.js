const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, 
  { cors:{
    origin: "*"
    } 
});
const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log(`Connected with session ${socket.id}`);

  socket.on("ping", () => {
    socket.emit("pong");
  })

});



io.listen(port, () => `Sitting at localhost:${port}`);