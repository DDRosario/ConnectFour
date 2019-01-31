import * as React from 'react';
import { UsernameForm } from './components/UsernameForm';
import { GameBoard } from './components/GameBoard';
import { SocketApi } from './socketApi';

enum cell {
  none,
  player1,
  player2
}
export interface AppProps {}
export interface State {
  board: cell[][];
  loggedIn: boolean;
}

export class App extends React.Component<AppProps, {}> {
  readonly state: State;
  public socket: SocketApi;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      board: [[0], [0]],
      loggedIn: true
    };
    this.socket = new SocketApi();
    this.joinGame = this.joinGame.bind(this);
    this.placeMove = this.placeMove.bind(this);
  }

  joinGame(e: React.FormEvent): void {
    e.preventDefault();
    console.log('Button clicked');
    this.socket.listenForGame((board: number[][]) => {
      console.log('hello board', board);
      this.setState({ board });
    });
  }
  placeMove(e: React.MouseEvent, column: number) {
    this.socket.placeMove('' + column, () => {});
  }
  componentDidMount(): void {
    //TEMPORARY ENTER USERNAME DEFAULT TO DREW
    this.socket.enterUsername('Drew', () => {
      console.log('Added Drew as a username!');
    });
    this.socket.joinRoom('TestRoom');
  }

  render() {
    return (
      <span>
        <h1>MVP ConnectFour</h1>
        {!this.state.loggedIn ? (
          <UsernameForm />
        ) : (
          <button
            onClick={(e: React.FormEvent) => {
              this.joinGame(e);
            }}
          />
        )}
        <GameBoard board={this.state.board} placeMove={this.placeMove} />
      </span>
    );
  }
}
