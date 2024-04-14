# yarnBallSimulator

import React from "react";
import "../css/Display.css";
import { Template } from "../Template";

export const Display = ({ upperPathColors, lowerPathColors }) => {
  const upperSemiCircles = [];
  const lowerSemiCircles = [];

  for (let i = 0; i <= 10; i++) {
    // Calculate radius and zIndex
    const radius = 300 - i * 15;
    const zIndex = 10 + i * 10;
    const top = i * 15;
    const left = i * 15;

    // Generate paths for upper semi-circle
    upperSemiCircles.push(
      <Template
        key={i}
        radius={radius}
        zIndex={zIndex}
        top={top}
        left={left}
        pathColor={upperPathColors[i % upperPathColors.length]} // Cycle through colors
        showStroke
      />
    );

    // Generate paths for lower semi-circle
    lowerSemiCircles.push(
      <Template
        key={i}
        radius={radius}
        zIndex={zIndex}
        bottom={top}
        left={left}
        pathColor={lowerPathColors[i % lowerPathColors.length]} // Cycle through colors
        showStroke
      />
    );
  }

  return (
    <div className="displayContainer">
      {/* Display upper semi-circle */}
      <div className="displayUpperCircle">{upperSemiCircles}</div>
      {/* Display lower semi-circle */}
      <div className="lowerSemiCircleContainer">
        <div className="displayLowerCircle">{lowerSemiCircles}</div>
      </div>
    </div>
  );
};
