import * as React from 'react';
import { BoardRow } from './BoardRow';

enum cell {
  none,
  player1,
  player2
}
export interface Props {
  board: number[][];
  placeMove: Function;
}
export interface GameBoardState {
  board: cell[][];
}

export class GameBoard extends React.Component<Props, {}> {
  public readonly state: GameBoardState;
  constructor(props: Props) {
    super(props);
    this.state = {
      board: props.board
    };
  }

  componentDidMount() {}

  render() {
    return (
      <span>
        <div className="gameBoard">
          {this.props.board.map((row, i) => {
            return (
              <BoardRow row={row} key={i} placeMove={this.props.placeMove} />
            );
          })}
        </div>
      </span>
    );
  }
}
