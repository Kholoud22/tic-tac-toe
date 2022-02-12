import "./App.css";
import React, { useState, useEffect } from "react";
import Cell from "./components/Cell";
import { Patterns } from "./Patterns";

const App = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [message, setMessage] = useState("Next Move: X");

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player === "X") {
      setPlayer("O");
      setMessage("Next Move: O");
    } else {
      setPlayer("X");
      setMessage("Next Move: X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      setMessage(`Winner is: ${result.winner}`)
    }
  }, [result]);

  const chooseCell = (cell) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === cell && val === "") {
          return player;
        }

        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((cell) => {
      if (cell === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setMessage("Next Move: X");
  };

  return (
    <div className="App">
      <div className="board">
        <div className="title">Tic Tac Toe!</div>
        <div className="row" style={{
             borderBottom:'3px solid silver'}}>
         {board.map((b,i) => i < 3  && ( 
          <Cell key={i} index={i} isLast={i === 2 ? true : false} val={board[i]} chooseCell={() => { chooseCell(i) }} /> ))}
        </div>
        <div className="row">
        {board.map((b,i) => i < 6 && i >= 3 && ( 
          <Cell key={i} isLast={i === 5 ? true : false} index={i} val={board[i]} chooseCell={() => { chooseCell(i) }} /> ))}
        </div>
        <div className="row" style={{
        borderTop:'3px solid silver'
      }}>
        {board.map((b,i) => i < 9 && i >= 6 && ( 
          <Cell key={i} index={i} isLast={i === 8 ? true : false} val={board[i]} chooseCell={() => { chooseCell(i) }} /> ))}
        </div>
         <div style={{ paddingTop:'25px' }}>
           {message}
         </div>
         <div style={{ paddingTop:'5px' }}>
           <button onClick={restartGame}>Reset!</button>
         </div>
      </div>
    </div>
  );
}

export default App;
