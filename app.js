const express = require("express");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;
const INDEX = __dirname+"/index.html";

// let currentUser = "";

const server = app
.get("/",(req, res) => res.sendFile(INDEX, { root: __dirname }))
// .get("/chat",(req, res) => res.render("chat",{user: currentUser}))
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", function (socket) {
  console.log("Connect with ", socket.id);

  socket.on("chat", function (data) {
    console.log(data);
    io.emit("chat", data);
  });
});



app.post("/",function(req,res){
  console.log(req.body.nameButton);
  res.render("chat",{user: req.body.nameButton});
  // currentUser = req.body.nameButton;
  // res.redirect('/chat');
});