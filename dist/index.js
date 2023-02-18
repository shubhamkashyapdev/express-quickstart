"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var db_1 = require("./config/db");
// Routers
var DeviceRouter_1 = __importDefault(require("./routers/DeviceRouter"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/device', DeviceRouter_1.default);
app.use('/', function (req, res) {
    res.status(200).json('Working');
});
var server = app.listen(5000, function () {
    console.log('app is listening on port: 5000 in development environment');
    (0, db_1.connectDB)();
});
var socket = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
socket.on('connection', function (socket) {
    console.log("Socket initialized successfully!!");
    socket.emit('connected', 'socket connection established');
    socket.on('disconnrect', function () {
        console.log('Client disconnected!!');
    });
});
