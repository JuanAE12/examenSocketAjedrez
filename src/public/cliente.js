var tablero;
var juego;
window.onload = function () {
    inicioJuego();
};

var inicioJuego = function() {
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: movimiento,
    };
    tablero = new ChessBoard('gameBoard', cfg);
    juego = new Chess();
};

var movimiento = function(source, target ) {
    var move = juego.move({from: source, to: target});
    if (move === null)  return 'snapback';
};

//configuramos nuestro cliente
var socket = io();
window.onclick = function(e) {
    socket.emit('mensaje', 'mensaje servidor');
};

//enviamos movimientos realizados por el cliente a nuestro tablero de ajedrez
var movimiento = function(source, target) {
    var move = juego.move({from: source, to: target});
    if (move === null)  return 'snapback';
    else socket.emit('move', move);
};

socket.on('move', function (msg) {
    juego.move(msg);
    tablero.position(juego.fen());
});