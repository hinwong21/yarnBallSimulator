import React, { useState, useRef } from "react";
import "./App.css";
import { Template } from "./Template";
import { ColorPicker } from "./component/ColorPicker";
import { WhiteCircle } from "./component/WhiteCircle";
import { filterAndReducePathColors } from "./useFetch/filterPathColors";
import { Display } from "./component/Display";

function App() {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const upperSemiCircles = [];
  const lowerSemiCircles = [];
  const upperCircleRef = useRef();
  const lowerCircleRef = useRef();
  const [showDisplay, setShowDisplay] = useState(false);
  const [upperPathColors, setUpperPathColors] = useState([]);
  const [lowerPathColors, setLowerPathColors] = useState([]);

  // Function to get path colors from upper and lower circles
  const getPathColors = () => {
    const upperPaths = Array.from(
      upperCircleRef.current.querySelectorAll("path")
    );
    const lowerPaths = Array.from(
      lowerCircleRef.current.querySelectorAll("path")
    );

    const upperPathColorsTemp = {};
    const lowerPathColorsTemp = {};

    upperPaths.forEach((path, index) => {
      const color = path.getAttribute("fill");
      const key = Math.floor(index / 60) + 1; // Calculate the corresponding key
      upperPathColorsTemp[key] = upperPathColorsTemp[key] || [];
      upperPathColorsTemp[key].push(color);
    });

    const upperPathColorsFiltered = filterAndReducePathColors(
      upperPathColorsTemp,
      true
    );

    lowerPaths.forEach((path, index) => {
      const color = path.getAttribute("fill");
      const key = Math.floor(index / 60) + 1; // Calculate the corresponding key
      lowerPathColorsTemp[key] = lowerPathColorsTemp[key] || [];
      lowerPathColorsTemp[key].push(color);
    });

    const lowerPathColorsFiltered = filterAndReducePathColors(
      lowerPathColorsTemp,
      false
    );

    // show Display and give props
    setShowDisplay(true);
    setUpperPathColors(upperPathColorsFiltered);
    setLowerPathColors(lowerPathColorsFiltered);
  };

  // Loop 10 times
  for (let i = 0; i <= 10; i++) {
    // Calculate radius and zIndex
    const radius = 300 - i * 15;
    const zIndex = 10 + i * 10;
    const top = i * 15;
    const left = i * 15;

    // Add Template component with calculated props to templates array
    upperSemiCircles.push(
      <Template
        key={i}
        radius={radius}
        zIndex={zIndex}
        top={top}
        left={left}
        pathColor={selectedColor}
        showStroke
      />
    );

    lowerSemiCircles.push(
      <Template
        key={i}
        radius={radius}
        zIndex={zIndex}
        bottom={top}
        left={left}
        pathColor={selectedColor}
        showStroke
      />
    );
  }

  return (
    <div className="App">
      <div className="editContainer">
        <div className="editPanel">
          <ColorPicker onChange={setSelectedColor} />

          <button onClick={getPathColors}>Get Path Colors</button>
        </div>

        <div className="boxContainer">
          <div className="upperSemiCircle" ref={upperCircleRef}>
            {upperSemiCircles}
          </div>

          <div className="lowerSemiCircleContainer" ref={lowerCircleRef}>
            <div className="lowerSemiCircle">{lowerSemiCircles}</div>
          </div>

          <WhiteCircle />
        </div>
      </div>

      {showDisplay && (
        <Display
          upperPathColors={upperPathColors}
          lowerPathColors={lowerPathColors}
        />
      )}
    </div>
  );
}

export default App;
