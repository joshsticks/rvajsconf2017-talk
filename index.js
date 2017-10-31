const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let stdin = process.stdin;

stdin.resume();

stdin.on("data", key => {
  if (key == "\u0003") {
    process.exit();
  }

  process.stdout.write(key);
  io.emit("rfid", key);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
