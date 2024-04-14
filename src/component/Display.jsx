import React from "react";
import "../css/Display.css";
import { DisplayTemplate } from "./DisplayTemplate";

export const Display = ({ upperPathColors, lowerPathColors }) => {
  const upperSemiCircles = [];
  const lowerSemiCircles = [];

  console.log(upperPathColors);

  function extendSubArrays(arr) {
    const extendedArr = arr.map((subarray) => subarray.concat(subarray));
    const firstArray = arr[0].slice().concat(arr[arr.length - 1]);
    extendedArr.push(firstArray);
    return extendedArr;
  }

  for (let i = 0; i < 10; i++) {
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
