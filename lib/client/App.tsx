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
  room: string;
  player: cell;
  user: string;
  numberOfPlayers: number;
  loggedIn: boolean;
  turn: boolean;
}

export class App extends React.Component<AppProps, {}> {
  readonly state: State;
  public socket: SocketApi;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      loggedIn: false,
      room: '',
      player: 0,
      user: '',
      numberOfPlayers: 0,
      turn: false
    };
    this.socket = new SocketApi();
    this.joinGame = this.joinGame.bind(this);
    this.placeMove = this.placeMove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.state.turn) {
      this.socket.placeMove('' + column, (turn: boolean) => {
        this.setState({
          turn
        });
      });
    }
  }
  /*Event Handlers*/
  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.socket.enterUsername(this.state.user, () => {
      this.setState({
        loggedIn: true
      });
      this.socket.joinRoom('TestRoom', (room: string) => {
        this.setState({
          room
        });
      });
    });
  }
  handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      user: e.currentTarget.value
    });
  }
  /*Life Cycle*/
  componentDidMount(): void {
    this.socket.listenForTurn((turn: boolean) => {
      this.setState({ turn });
    });
  }

  render() {
    return (
      <span>
        <h1>MVP ConnectFour</h1>
        {!this.state.loggedIn ? (
          <UsernameForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <button
            onClick={(e: React.FormEvent) => {
              this.joinGame(e);
            }}
            id="start"
          >
            Start Game
          </button>
        )}
        <div id="playerTurnRow" />
        {this.state.turn ? <div>Your Turn</div> : <div>Player 2's turn</div>}
        <GameBoard board={this.state.board} placeMove={this.placeMove} />
        <div>In room:{this.state.room}</div>
        <div>
          {this.state.numberOfPlayers < 2 && this.state.loggedIn ? (
            <div>waiting for another player</div>
          ) : (
            <div />
          )}
        </div>
      </span>
    );
  }
}
