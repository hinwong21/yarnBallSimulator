import React from "react";
import "../css/Display.css";
import { DisplayTemplate } from "./DisplayTemplate";

export const Display = ({ upperPathColors, lowerPathColors }) => {
  const upperSemiCircles = [];
  const lowerSemiCircles = [];

  function extendSubArrays(arr) {
    const tempArr = arr.map((subarray) => subarray.concat(subarray));
    return tempArr.concat(tempArr.slice().reverse());
  }

    for (let i = 0; i < 20; i++) {
      const radius = 300 - i * 15;
      const zIndex = 10 + i * 10;
      const top = i * 15;
      const left = i * 15;

      upperSemiCircles.push(
        <DisplayTemplate
          key={i}
          radius={radius}
          zIndex={zIndex}
          top={top}
          left={left}
          fillColors={extendSubArrays(upperPathColors)[i]}
        />
      );

      lowerSemiCircles.push(
        <DisplayTemplate
          key={i}
          radius={radius}
          zIndex={zIndex}
          bottom={top}
          left={left}
          fillColors={extendSubArrays(lowerPathColors)[i]}
        />
      );
    }

  return (
    <div className="displayContainer">
      <div className="displayUpperCircles">{upperSemiCircles}</div>

      <div className="lowerSemiCircleContainer">
        <div className="displayLowerCircles">{lowerSemiCircles}</div>
      </div>
    </div>
  );
};
