import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const emptyboard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const [board, setBoard] = useState(emptyboard);
  const [turn, setTurn] = useState('X')

  const handleTurn = (y, x) => {
    if (board[y][x] === '') {
      let newBoard = board
      newBoard[y][x] = turn
      setTurn(turn === 'X' ? 'O': 'X') // if turn == 'X', then set as 'O' else 'X'
      setBoard(newBoard)
    }
  }

  return (
    <div className='parent'>
      {board.map((row, y) => {
        return (
          <div className='row'>
            {row.map((value, x) => {
              return (
                <button onClick={() => handleTurn(y,x)}>{value}</button>
              )
            })}
          </div>
      )})}
    </div>
  );
}

export default App;
