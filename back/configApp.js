import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {Server} from "socket.io";
import cors from "cors";
import {routerAuthentication} from "./authentication/routes/authentication.js";
import socketioJwt from 'socketio-jwt';

const app = express();
export const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', routerAuthentication);

io.use(socketioJwt.authorize({
    secret: 'secret',
    handshake: true,
}));