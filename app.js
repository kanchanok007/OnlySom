const express = require("express");
const socketIO = require("socket.io");

const app = express();
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;
const INDEX = __dirname+"/index.html";



const server = app
.get("/",(req, res) => res.sendFile(INDEX, { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", function (socket) {
  console.log("Connect with ", socket.id);

  socket.on("chat", function (data) {
    console.log(data);
    io.emit("chat", data);
  });
});
