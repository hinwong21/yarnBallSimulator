import React, { useState, useMemo } from "react";
import "./Template.css";

export const Template = ({ radius, zIndex, top, left, bottom, pathColor }) => {
  const diameter = radius * 2;
  const numParts = 120;
  const segmentAngle = 360 / numParts;

  // Memoize start angles calculation
  const startAngles = useMemo(() => {
    return Array.from({ length: numParts }, (_, index) => index * segmentAngle);
  }, [numParts, segmentAngle]);

  // Define state for color
  const [colors, setColors] = useState(() => Array(numParts).fill("white"));

  // Memoize updatePathColor function
  const updatePathColor = useMemo(() => {
    return (index, color) => {
      setColors((prevColors) => {
        const updatedColors = [...prevColors];
        updatedColors[index] = color;
        return updatedColors;
      });
    };
  }, []);

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
      {startAngles.map((startAngle, index) => {
        const endAngle = startAngle + segmentAngle;
        const startX = radius + radius * Math.cos((startAngle * Math.PI) / 180);
        const startY = radius + radius * Math.sin((startAngle * Math.PI) / 180);
        const endX = radius + radius * Math.cos((endAngle * Math.PI) / 180);
        const endY = radius + radius * Math.sin((endAngle * Math.PI) / 180);

        const pathId = `path-${index}`;

        return (
          <path
            key={index}
            className="circle-segment"
            id={pathId}
            d={`M ${radius},${radius} L ${startX},${startY} A ${radius},${radius} 0 ${
              endAngle - startAngle > 180 ? 1 : 0
            },1 ${endX},${endY} Z`}
            fill={colors[index]}
            onClick={() => updatePathColor(index, pathColor)}
            onDoubleClick={handleDoubleClick} // Add double click event handler
          ></path>
        );
      })}
    </svg>
  );
};
