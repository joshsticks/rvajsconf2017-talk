const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let stdin = process.stdin;

stdin.resume();

stdin.on("data", key => {
  process.stdout.write(key);
  io.emit("rfid", key);
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
