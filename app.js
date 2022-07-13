const express = require("express");
// const socket = require("socket.io");
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const app = express();
app.use(express.static("public"));
// let server = 

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.listen(process.env.PORT);

io.on("connection", function(socket){
    console.log("Connect with ", socket.id);

    socket.on("chat",function(data){
        console.log(data);
        io.emit("chat", data );  
    });
});

http.listen(process.env.PORT || 8080, () => console.log('listening on http://localhost:8080') );