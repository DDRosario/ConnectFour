import * as io from 'socket.io-client';

export class SocketApi {
  private socket: SocketIOClient.Socket;
  constructor() {
    this.socket = io('http://localhost:3005');
  }

  public startGame() {
    this.socket.emit('start game');
  }
  public enterUsername(username: string, cb: Function) {
    this.socket.emit('enter username', username);
    cb();
    // this.loadListeners(cb)
  }
  public joinRoom(roomName: string, cb: Function) {
    this.socket.emit('join room', roomName);
    cb(roomName);
  }
  public placeMove(column: string, cb: Function) {
    this.socket.emit('placed move', column);
    // this.socket.on('update board', )
  }
  public listenForGame(cb: Function) {
    this.socket.emit('ready', 'true');
    this.socket.on('get board', (board: string) => {
      cb(JSON.parse(board));
    });
  }
  public listenForTurn(cb: Function) {
    this.socket.on('turn', (turn: boolean) => {
      cb(turn);
    });
  }
  public listenForJoined(cb: Function) {
    this.socket.on('joined', (username: string) => {
      cb(username);
    });
  }
}
