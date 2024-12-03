const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

// socket.io setup
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine
app.set("view engine", "ejs");

// Set the static folder
app.use(express.static(path.join(__dirname, "public")));

// Socket.io connection
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("received-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected",socket.id)
  })
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000);
