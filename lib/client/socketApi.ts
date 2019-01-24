import * as io from 'socket.io-client';

export class SocketApi {
  private socket: SocketIOClient.Socket;
  constructor() {
    this.socket = io('http://localhost:3005');
  }

  public startGame() {}
  public join(username: string, cb: Function) {}
}
