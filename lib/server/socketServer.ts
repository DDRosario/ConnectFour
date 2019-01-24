import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { connectFour } from './gameLogic';

declare interface Rooms {
  [roomId: string]: gameRoom;
}
declare interface gameRoom {
  numPlayers: number;
  game?: connectFour;
}
export class socketServer {
  public app: express.Application;
  private http: Server;
  private io: socketIo.Server;
  private rooms: Rooms;
  public readonly PORT: number = 3005;

  constructor() {
    this.app = express();
    this.http = createServer(this.app);
    this.io = socketIo(this.http);
    this.rooms = {};
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

      socket.on('join', (username: string) => {
        console.log('User joined with username: ', username);
        //have the user join a room
        let room: string = 'room1';
        socket.join(room);
        this.rooms[room] = {
          numPlayers: this.rooms[room].numPlayers
            ? this.rooms[room].numPlayers + 1
            : 1
        };
        socket.on('start game', () => {
          const game: connectFour = this.startGame(room);
          socket.to(room).emit('new game');
        });
      });
    });
  }
  private startGame(room: string): connectFour {
    this.rooms[room].game = new connectFour();
    return this.rooms[room].game;
  }
}
