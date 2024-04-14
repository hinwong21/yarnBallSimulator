import React, { useState } from "react";
import "./Template.css";

export const Template = ({
  id,
  radius,
  numParts,
  zIndex,
  top,
  left,
  bottom,
  pathColor,
  showStroke,
  colorArray,
}) => {
  const diameter = radius * 2;
  const segmentAngle = 360 / numParts;

  // Define state for color
  const [colors, setColors] = useState(colorArray);
  console.log(colorArray, "template");

  // Function to update path color
  const updatePathColor = (index, color) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = color;

      // Check if the current index is a multiple of 5
      if ((index + 1) % 5 === 0) {
        // Fill 5 paths from index to index - 4
        for (let i = index; i > index - 5; i--) {
          if (i >= 0) {
            updatedColors[i] = color;
          }
        }
      }
      return updatedColors;
    });
  };

  // Function to handle double click event
  const handleDoubleClick = () => {
    const newColors = Array(numParts).fill(pathColor);
    setColors(newColors);
  };

  return (
    <svg
      className="circle-divider"
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
      style={{ zIndex, top, left, bottom }}
    >
      {Array.from({ length: numParts }, (_, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = startAngle + segmentAngle;
        const startX = radius + radius * Math.cos((startAngle * Math.PI) / 180);
        const startY = radius + radius * Math.sin((startAngle * Math.PI) / 180);
        const endX = radius + radius * Math.cos((endAngle * Math.PI) / 180);
        const endY = radius + radius * Math.sin((endAngle * Math.PI) / 180);

        const pathId = `path-${index}`;
        const fillColor = colors[index];

        let strokeColor;
        if (showStroke) {
          strokeColor = fillColor === "#000000" ? "white" : "black";
        }

        return (
          <path
            key={`${id} - ${index}`}
            id={pathId}
            d={`M ${radius},${radius} L ${startX},${startY} A ${radius},${radius} 0 ${
              endAngle - startAngle > 180 ? 1 : 0
            },1 ${endX},${endY} Z`}
            fill={fillColor}
            style={{ stroke: strokeColor }}
            onClick={() => updatePathColor(index, pathColor)}
            onDoubleClick={handleDoubleClick}
          />
        );
      })}
    </svg>
  );
};
