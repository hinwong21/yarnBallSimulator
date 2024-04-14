import React, { useState } from "react";

export const FillGrid = ({ selectedColor, onUpdateUpperSemiCircle }) => {
  const [squareColors, setSquareColors] = useState(
    new Array(60 * 10).fill("#FFFFFF")
  ); // Initialize array with white color for each square

  const handleSquareClick = (index) => {
    // Create a copy of the squareColors array to avoid mutating state directly
    const updatedColors = [...squareColors];
    updatedColors[index] = selectedColor; // Update the color of the clicked square

    // Update the state with the new colors array
    setSquareColors(updatedColors);

    // Pass the updated colors array to the function responsible for updating the upper semi-circle
    onUpdateUpperSemiCircle(updatedColors);
  };

  const numCols = 10; // Number of columns
  const numRows = 60; // Number of rows
  const squareSize = "5px"; // Size of each square in pixels

  const squares = [];

  // Loop through rows and columns to create the squares
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const index = i * numCols + j; // Calculate the index of the square
      squares.push(
        <div
          key={`${i}-${j}`}
          className="square"
          style={{
            width: squareSize,
            height: squareSize,
            backgroundColor: squareColors[index], // Set the background color from the squareColors array
          }}
          onClick={() => handleSquareClick(index)} // Pass the index of the clicked square to the click handler
        ></div>
      );
    }
  }

  return <div className="grid">{squares}</div>;
};
