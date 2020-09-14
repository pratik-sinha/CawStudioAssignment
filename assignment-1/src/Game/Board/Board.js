import React, { useEffect, useRef, useState } from 'react';
import Square from './Square/Square'

const Board = () => {
    const [columns,setColumns] = useState(0);
    const [rows,setRows] = useState(0);
    const cursor= useRef(null);
    const [newPos,setNewPos] = useState(null);
    const spriteCount = useRef(10);
    const inputRef = useRef();
    const [array,setArray] = useState(Array(0))
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        var columns =  prompt("Please enter number of columns ");
        var rows =  prompt("Please enter number of rows ");
        setArray(Array(rows * columns).fill(0))
        setColumns(Number(columns))
        setRows(Number(rows))
    },[])

    useEffect(() => {
      if (rows > 0 && columns > 0 && (rows*columns === array.length)) {
        setSpritesAndPlayerPosition()
        inputRef.current.focus()
      }
    },[rows,columns])

    useEffect(() =>{
      let newArray=[...array];

      if ((newPos!= null) && newPos >= 0 && newPos < (rows * columns)) {
        setMoves(moves + 1)
        if(newArray[newPos] === 'S') {
         spriteCount.current--;
         if(spriteCount.current === 0) {
           alert(`you won! number of moves : ${moves + 1}`)
         }
        }
        newArray[cursor.current] = 0
        cursor.current = newPos
        newArray[newPos] = 'P'
        setArray(newArray)
     }
    },[newPos])

    const setSpritesAndPlayerPosition = () => {
      const newArray = [...array];
      let indexArray =[];
      const playerPos = Math.floor((rows*columns)/2 - 1);
      cursor.current = playerPos
      newArray[playerPos] = 'P'
      for (var i=0;i<10;i++) {
        let randomIndex = getRandomArbitrary();
        if (newArray[randomIndex] === 'S' || newArray[randomIndex] === 'P') {
          while( newArray[randomIndex] === "S" || newArray[randomIndex] === 'P') {
            randomIndex = getRandomArbitrary();
          }
        } 
        indexArray.push(randomIndex);
       newArray[randomIndex] = 'S' 
      }
      setArray(newArray)
    }

    const getRandomArbitrary = (min, max) => {
      min = 0;
      max = rows*columns - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

    const getGrid = () => {
      let counter = -1;
     return Array(rows).fill(0).map((_,i) => {
        return (
          <div className="board-row">
             {
               Array(columns).fill(0).map((_,j) =>{
                 counter++
                return <Square index={counter} value={array[counter]} />
               })
             } 
        </div>
        )
      })
    }

    const onKeyPress = (e) => {
      switch (e.keyCode) {
        case 37:
             setNewPos( cursor.current - 1);
          break;
        case 39:
          //right
             setNewPos(cursor.current +  1); 
          break;
        case 38:
          //up
             setNewPos (cursor.current - columns);
          break;
        case 40:
          //down
              setNewPos(cursor.current + columns);
      }
    }

    return (
      <div>
          <h5>Use arrow keys to move and collect masks</h5>
          <p>Number of moves: {moves}</p>
          <input className="hiddenInput" ref={inputRef} onKeyDown={e => onKeyPress(e)} onBlur={() => inputRef.current.focus()} />
         {
          getGrid()
        }
      </div>
    );
}

export default Board