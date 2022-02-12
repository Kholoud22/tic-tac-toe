import React from "react";
import "../App.css";
const Cell = (props) => {
  return (
    <div style={ props.val === "X" ? { color:'palevioletred' }:{ color:'darkcyan' }} 
     className={props.isLast ? 'cell remove-border' : 'cell'} onClick={props.chooseCell}>
      {props.val}
    </div>
  );
}

export default Cell;
