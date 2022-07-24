const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const app = express();
const server = createServer(app);
const io = new Server(server,
  {
    cors: {
      origin: "*"
    }
  });

const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log(`Connected with session ${socket.id}`);

  socket.on("ping", () => {
    socket.emit("pong");
  })

  socket.on("disconnect", function () {
    console.log("terminate socket")
    socket.disconnect(0);
  });
});


app.get('/', (req, res) => {
  res.send("Hello world")
})
app.get('/predict', async (req, res) => {
  console.log("Cargando modelo...");
  const model = await tf.loadGraphModel("file://C:/Users/andres/Documents/code/skin-cancer-ai-deployed/backend/src/ml/model.json");
  console.log("Modelo cargado...");
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
