import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { connectFour } from './gameLogic';

interface Rooms {
  [roomId: string]: gameRoom;
}
interface gameRoom {
  numPlayers: number;
  game?: connectFour;
}
export class socketServer {
  public app: express.Application;
  private http: Server;
  private io: socketIo.Server;
  private rooms: Rooms;
  private queue: string[];
  public readonly PORT: number = 3005;

  constructor() {
    this.app = express();
    this.http = createServer(this.app);
    this.io = socketIo(this.http);
    this.rooms = {};
    this.serverListen();
    this.listenForConnections();
    this.queue = [];
  }
  private serverListen(): void {
    this.http.listen(this.PORT, () => {
      console.log('Socket Server is listening to port: ', this.PORT);
    });
  }
  private listenForConnections(): void {
    this.io.on('connection', (socket: socketIo.Socket) => {
      console.log(socket.id + ' has connected');

      socket.on('enter username', (username: string) => {
        console.log('User joined with username: ', username);
        //have the user join a room
        socket.on('join room', (roomName: string) => {
          roomName = this.joinRoom(socket, roomName);
          this.io.in(roomName).emit('joined', username);

          socket.on('start game', () => {
            const game: connectFour = this.startGame(roomName);
            socket.to(roomName).emit('new game');
          });
        });
      });
    });
  }
  private joinRoom(socket: socketIo.Socket, roomName: string): string {
    if (roomName.length === 0) {
      //need to join a default room
      //TODO UPDATE TO AUTO PICK A NONE FULL ROOM
      if (this.queue.length > 0) {
        roomName = this.dequeue();
      } else {
        roomName = 'room1';
      }
    }
    socket.join(roomName);
    this.rooms[roomName] = {
      numPlayers: this.rooms[roomName].numPlayers
        ? this.rooms[roomName].numPlayers + 1
        : 1
    };
    return roomName;
  }
  private startGame(roomName: string): connectFour {
    this.rooms[roomName].game = new connectFour();
    return this.rooms[roomName].game;
  }
  private enqueue(roomName: string): void {
    this.queue.push(roomName);
  }
  private dequeue(): string {
    return this.queue.shift();
  }
}
