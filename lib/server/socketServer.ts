import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';

export class socketServer {
  public app: express.Application;
  private http: Server;
  private io: socketIo.Server;
  private rooms: number;
  public readonly PORT: number = 3005;

  constructor() {
    this.app = express();
    this.http = createServer(this.app);
    this.io = socketIo(this.http);
    this.rooms = 1;
    this.serverListen();
    this.listenForConnections();
  }
  private serverListen() {
    this.http.listen(this.PORT, () => {
      console.log('Socket Server is listening to port: ', this.PORT);
    });
  }
  private listenForConnections() {
    this.io.on('connection', (socket: socketIo.Socket) => {
      console.log(socket.id + ' has connected');

      socket.on('join', (username: String) => {
        console.log('User joined with username: ', username);
        //have the user join a room
      });
    });
  }
}
