const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const diagnoseRouter = require('./routes/diagnose');

const app = express();
const server = createServer(app);
const io = new Server(server,
  {
    cors: {
      origin: "*"
    }
  });

const port = process.env.PORT || 5000;

app.use('/diagnose', diagnoseRouter);

io.on("connection", (socket) => {
  socket.on("ping", () => {
    socket.emit("pong");
  })

  socket.on("disconnect", function () {
    socket.disconnect(0);
  });
});

app.get('/', (req, res) => {
  res.send("Hello world")
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
