import * as React from 'react';

export enum cell {
  none,
  player1,
  player2
}
interface BoardCellProps {
  cell: cell;
  column: number;
  placeMove: Function;
}

export const BoardCell = (props: BoardCellProps) => {
  return (
    <span
      className="boardCell"
      onClick={e => {
        props.placeMove(e, props.column);
      }}
    >
      <div id={`cell${props.cell}`}>{props.cell}</div>
    </span>
  );
};
