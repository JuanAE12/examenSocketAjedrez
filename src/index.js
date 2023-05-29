const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
const httpServer = createServer(app);

//Martinez Ticona Juan de Dios Abad
const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

instrument(io, {
  auth: false,
  mode: "development",
});

app.use( express.static(path.join(__dirname, "public")) );

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

httpServer.listen(3000);

//configuramos nuestro servidor
io.on('connection', function(socket) {
    console.log('nueva conexión: '+socket.id);
    socket.on('move', function(msg) {
        socket.broadcast.emit('move', msg);
    });
});